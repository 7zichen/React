package com.aowin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aowin.dao.ColumnMapper;
import com.aowin.dao.NewsMapper;
import com.aowin.entity.Respond;
import com.aowin.entity.Column;
import com.aowin.entity.News;
import com.aowin.entity.NewsDetail;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/newsfront")
public class NewsController {
	@Autowired
	private NewsMapper newsMapper;

	@Autowired
	private ColumnMapper columnMapper;

	@RequestMapping("/list")
	public Respond select(String columnName, Integer page) {
		Respond msg = new Respond();
		PageHelper.startPage(page == null ? 1 : page, 10);
		List<News> newsList = newsMapper.selectNews(columnName);
		PageInfo<News> info = new PageInfo<>(newsList);
		msg.setCode(2);
		msg.setMessage("success");
		msg.setData(info);
		return msg;
	}

	@RequestMapping("/detail")
	public Respond selectNewsById(String newsId) {
		Respond msg = new Respond();
		NewsDetail news = newsMapper.getNewsById(newsId);
		if (news == null) {
			msg.setCode(4);
			msg.setMessage("fail");
		} else {
			msg.setCode(2);
			msg.setMessage("success");
			msg.setData(news);
		}
		return msg;
	}

	@RequestMapping("/columns")
	public Respond selectColumns() {
		Respond msg = new Respond();
		List<Column> columns = columnMapper.selectAllColumns();

		msg.setCode(2);
		msg.setMessage("success");
		msg.setData(columns);

		return msg;
	}
}
