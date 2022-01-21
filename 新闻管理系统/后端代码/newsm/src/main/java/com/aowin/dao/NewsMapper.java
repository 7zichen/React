package com.aowin.dao;

import java.util.List;
import java.util.Map;

import com.aowin.entity.News;

public interface NewsMapper {
	
	public void addNews(News news);
	public List<News> selectNews();
	public List<News> selectUnverifyNews();
	public News getNewsById(Long newsId);
	public int updateNews(News news);
	public int deleteNews(Long newsId);
	public int updateNewsById(Map map);
	public List<News> selectCondition(Map map);
}
