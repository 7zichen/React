package com.aowin.dao;

import java.util.List;

import com.aowin.entity.Column;

public interface ColumnMapper {
	
	public void addColumn(String columnName);
	public List<Column> selectColumns();
	public Column selectColumnByName(String columnName);

	public int updateColumn(Column column);
	public int deleteColumn(Integer columnId);
}
