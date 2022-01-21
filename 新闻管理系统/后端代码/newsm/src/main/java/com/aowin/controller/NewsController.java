package com.aowin.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.aowin.constants.BusinessStatus;
import com.aowin.dao.ColumnMapper;
import com.aowin.dao.NewsMapper;
import com.aowin.entity.Respond;
import com.aowin.entity.Column;
import com.aowin.entity.News;
import com.aowin.utils.DateUtil;
import com.aowin.utils.StringUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/news")
public class NewsController {
	@Autowired
	private NewsMapper newsMapper;
	@Autowired
	private ColumnMapper columnMapper;
	
	private boolean checkId(Long newsId, Respond rpd) {
		if(StringUtil.isEmpty(newsId)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 newsId 不能为空");
			return false;
		}
		return true;
	}
	
	private boolean checkNews(News news,Respond rpd) {
		if(StringUtil.isEmpty(news.getTitle())) {
			rpd.setMessage("参数 title 不能为空");
			return false;
		}
		if(StringUtil.isEmpty(news.getContent())) {
			rpd.setMessage("参数 content 不能为空");
			return false;
		}
		
		if(StringUtil.isEmpty(news.getColumnId())) {
			rpd.setMessage("参数 columnId 不能为空");
			return false;
		}
		
		return true;
	}

	@RequestMapping("/add")
	public Respond add(News news, @RequestParam(value="file",required=false) MultipartFile file, HttpServletRequest request) {
		Respond rpd = new Respond();
		if(!checkNews(news, rpd)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		
		if(file != null && !file.isEmpty()) {
			String fileName = file.getOriginalFilename();
			String ext = fileName.substring(fileName.lastIndexOf('.'));
			String path = DateUtil.currentTime("HmsS") + ext;
			try {
				File dest = new File("\\root\\upload\\imgs\\"+path);
				file.transferTo(dest);
				news.setPic("imgs/"+path);
				System.out.println("文件上传成功");
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				rpd.setCode(BusinessStatus.FAIL);
				rpd.setMessage("fail");
				rpd.setData("文件上传失败");
				return rpd;
			}
		}
		news.setNewsId(System.currentTimeMillis());
		news.setDate(DateUtil.currentTime());
		news.setStatus(0);
		news.setVerify(0);
		String username = (String) request.getAttribute("login");
		news.setAuthor(username);
		newsMapper.addNews(news);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		return rpd;
	}
	
	@RequestMapping("/upload")
	public Object upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		Respond rpd = new Respond();
		if(file != null && !file.isEmpty()) {
			String fileName = file.getOriginalFilename();
			String ext = fileName.substring(fileName.lastIndexOf('.'));
			String path = DateUtil.currentTime("HmsS") + ext;
			try {
				File dest = new File("\\root\\upload\\imgs\\"+path);
				file.transferTo(dest);
				Object obj = JSONObject.parse("{\"errno\": 0, \"data\": [{\"url\": \"//"
						+ request.getHeader("host")+"/imgs/"+path+"\"}]}");
				System.out.println("文件上传成功");
				return obj;
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				rpd.setCode(BusinessStatus.FAIL);
				rpd.setMessage("fail");
				rpd.setData("文件上传失败");
			}
		}else {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 file 不能为空");
		}
		return rpd;
	}

	@RequestMapping("/update")
	public Respond update(News news,@RequestParam(value="file",required=false) MultipartFile file) {
		Respond rpd = new Respond();
		if(!checkId(news.getNewsId(), rpd) || !checkNews(news, rpd)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		if(file != null && !file.isEmpty()) {
			String fileName = file.getOriginalFilename();
			String ext = fileName.substring(fileName.lastIndexOf('.'));
			String path = DateUtil.currentTime("HmsS") + ext;
			try {
				File dest = new File("\\root\\upload\\imgs\\"+path);
				file.transferTo(dest);
				news.setPic("imgs/"+path);
				System.out.println("文件上传成功");
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				rpd.setCode(BusinessStatus.FAIL);
				rpd.setMessage("fail");
				rpd.setData("文件上传失败");
				return rpd;
			}
		}
		int n = newsMapper.updateNews(news);
		if (n == 1) {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
		} else {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		}
		return rpd;
	}
	
	@RequestMapping("/delete")
	public Respond delete(Long newsId) {
		Respond rpd = new Respond();
		if(!checkId(newsId, rpd)) {
			return rpd;
		}
		int n = newsMapper.deleteNews(newsId);
		if (n == 1) {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
		} else {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		}
		return rpd;
	}

	@RequestMapping("/list")
	public Respond select(Integer page) {
		Respond rpd = new Respond();
		PageHelper.startPage(page == null ? 1 : page, 10);
		List<News> newsList = newsMapper.selectNews();
		PageInfo<News> info = new PageInfo<>(newsList);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		rpd.setData(info);
		return rpd;
	}

	@RequestMapping("/detail")
	public Respond selectNewsById(Long newsId) {
		Respond rpd = new Respond();
		if(!checkId(newsId, rpd)) {
			return rpd;
		}
		News news = newsMapper.getNewsById(newsId);
		if (news == null) {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		} else {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
			rpd.setData(news);
		}
		return rpd;
	}
	
	@RequestMapping("/query")
	public Respond selectQuery(Integer page,Long newsId,String title, String startDate, String endDate) {
		Respond rpd = new Respond();
		PageHelper.startPage(page == null ? 1 : page, 10);
		HashMap<String, Object> m = new HashMap<>();
		if(!StringUtil.isEmpty(newsId))
			m.put("newsId", newsId+"");
		if(!StringUtil.isEmpty(title))
			m.put("title", title);
		
		if(!StringUtil.isEmpty(startDate))
			m.put("startDate", startDate);
		if(!StringUtil.isEmpty(endDate))
			m.put("endDate", endDate);

		List<News> newsList = newsMapper.selectCondition(m);
		PageInfo<News> info = new PageInfo<>(newsList);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		rpd.setData(info);
		return rpd;
	}
	
	@RequestMapping("/column/add")
	public Respond addColumn(String columnName) {
		Respond rpd = new Respond();
		if(StringUtil.isEmpty(columnName)) {
			rpd.setMessage("参数 columnName 不能为空");
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		
		if(columnMapper.selectColumnByName(columnName)!=null) {
			rpd.setMessage("新闻栏目名称"+columnName+"已经存在，请勿重复添加");
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		
		columnMapper.addColumn(columnName);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		return rpd;
	}
	
	@RequestMapping("/column/update")
	public Respond updateColumn(Column column) {
		Respond rpd = new Respond();
		if(StringUtil.isEmpty(column.getColumnName())) {
			rpd.setMessage("参数 columnName 不能为空");
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		
		if(columnMapper.selectColumnByName(column.getColumnName())!=null) {
			rpd.setMessage("新闻栏目名称"+column.getColumnName()+"已经存在，请勿重复");
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		
		columnMapper.updateColumn(column);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		return rpd;
	}
	
	@RequestMapping("/column/delete")
	public Respond deleteColumn(Integer columnId) {
		Respond rpd = new Respond();
		if(StringUtil.isEmpty(columnId)) {
			rpd.setMessage("参数 columnId 不能为空");
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		
		int n = columnMapper.deleteColumn(columnId);
		if (n == 1) {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
		} else {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		}
		
		return rpd;
	}
	
	@RequestMapping("/column/list")
	public Respond selectColumns(Integer page) {
		Respond rpd = new Respond();
		PageHelper.startPage(page == null ? 1 : page, 10);
		List<Column> columnList = columnMapper.selectColumns();
		PageInfo<Column> info = new PageInfo<>(columnList);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		rpd.setData(info);
		return rpd;
	}
	
	@RequestMapping("/column/all")
	public Respond selectAllColumns() {
		Respond rpd = new Respond();
		List<Column> columnList = columnMapper.selectColumns();
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		rpd.setData(columnList);
		return rpd;
	}

}
