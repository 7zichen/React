package com.aowin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aowin.constants.BusinessStatus;
import com.aowin.dao.NewsMapper;
import com.aowin.dao.NoteMapper;
import com.aowin.entity.Respond;
import com.aowin.entity.News;
import com.aowin.utils.StringUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/verify")
public class VerifyController {
	@Autowired
	private NewsMapper newsMapper;
	@Autowired
	private NoteMapper noteMapper;
	
	private Respond rpd;
	
	private boolean checkId(String id) {
		if(StringUtil.isEmpty(id)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 newsId 不能为空");
			return false;
		}
		return true;
	}
	
	@RequestMapping("/show/unverfiyNews")
	public Respond showUnverifyNews(Integer page) {
		rpd = new Respond();
		PageHelper.startPage(page == null ? 1 : page, 10);
		List<News> newsList = newsMapper.selectUnverifyNews();
		PageInfo<News> info = new PageInfo<>(newsList);
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		rpd.setData(info);
		return rpd;
	}
	
	@RequestMapping("/news")
	public Respond verifyNews(String newsId, Integer valid) {
		rpd = new Respond();
		if(!checkId(newsId)) {
			return rpd;
		}
		Map<String,Object> map = new HashMap<>();
		map.put("newsId", newsId);
		map.put("valid", valid);
		int n = newsMapper.updateNewsById(map);
		if (n == 0) {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		} else {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
		}
		return rpd;
	}
	
	@RequestMapping("/note")
	public Respond verifyNotes(String noteId, Integer valid) {
		rpd = new Respond();
		if(!checkId(noteId)) {
			return rpd;
		}
		Map<String,Object> map = new HashMap<>();
		map.put("id", noteId);
		map.put("valid", valid);
		int n = noteMapper.updateNote(map);
		if (n == 0) {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		} else {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
		}
		return rpd;
	}

}
