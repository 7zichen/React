package com.aowin.dao;

import java.util.List;

import com.aowin.entity.News;
import com.aowin.entity.NewsDetail;

public interface NewsMapper {
	public List<News> selectNews(String columnName);
	public NewsDetail getNewsById(String newsId);
}
