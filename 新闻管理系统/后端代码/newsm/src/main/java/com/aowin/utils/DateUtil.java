package com.aowin.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	/**
	 * 返回当前时间 格式为yyyy-MM-dd HH:mm:ss
	 */
	public static String currentTime(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(new Date());
	}
	public static String currentTime(String pattern){
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(new Date());
	}
	
	/**
	 * 返回当前日期 格式为yyyy-MM-dd
	 * @return
	 */
	public static String currentDate(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(new Date());
	}
	
	public static boolean isValid(String date) {
		boolean fl = date.matches("^[1-9]\\d{3}-\\d{2}-\\d{2}( \\d{2}:\\d{2}:\\d{2})?$");
		return fl;
	}
	
	public static long generateId() {
		return new Date().getTime();
	}

}
