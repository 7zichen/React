package com.aowin.entity;

import java.util.List;

public class Note {
	private String id;
	private Avatar avatar;
	private String text;
	private String date;
	private Integer status;
	private Integer favor;
	private List<Reply> replys;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public Avatar getAvatar() {
		return avatar;
	}

	public void setAvartar(Avatar avatar) {
		this.avatar = avatar;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getFavor() {
		return favor;
	}

	public void setFavor(Integer favor) {
		this.favor = favor;
	}

	public List<Reply> getReplys() {
		return replys;
	}

	public void setReplys(List<Reply> replys) {
		this.replys = replys;
	}
	
}
