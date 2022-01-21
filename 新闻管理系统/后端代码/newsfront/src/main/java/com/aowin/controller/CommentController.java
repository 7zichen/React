package com.aowin.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aowin.constants.BusinessStatus;
import com.aowin.dao.NoteMapper;
import com.aowin.dao.ReplyMapper;
import com.aowin.entity.Respond;
import com.aowin.utils.DateUtil;
import com.aowin.utils.StringUtil;

@RestController
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private NoteMapper noteMapper;
	@Autowired
	private ReplyMapper replyMapper;
	
	
	@RequestMapping("/add")
	public Respond addNote(Long newsId, String text, HttpServletRequest request) {
		Respond rpd = new Respond();
		if(StringUtil.isEmpty(newsId)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 newsId 不能为空");
			return rpd;
		}
		
		if(StringUtil.isEmpty(text)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 text 不能为空");
			return rpd;
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("id",DateUtil.currentTime("MdHmsS"));
		String account = (String) request.getAttribute("login");
		map.put("account",account);
		map.put("date",DateUtil.currentTime());
		map.put("newsId",newsId);
		map.put("text",text);
		noteMapper.addNote(map);
		
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		return rpd;
	}
	
	@RequestMapping("/reply")
	public Respond addReply(String noteId, String text, HttpServletRequest request) {
		Respond rpd = new Respond();
		if(StringUtil.isEmpty(noteId)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 noteId 不能为空");
			return rpd;
		}
		
		if(StringUtil.isEmpty(text)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 text 不能为空");
			return rpd;
		}
		Map<String, Object> map = new HashMap<>();
		map.put("noteId",noteId);
		map.put("text",text);
		String account = (String) request.getAttribute("login");
		map.put("account",account);
		map.put("date",DateUtil.currentTime());
		replyMapper.addReply(map);
		
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		return rpd;
	}
	

	@RequestMapping("/favor")
	public Respond giveALike(String id, Integer type) {
		Respond rpd = new Respond();
		
		if(StringUtil.isEmpty(id)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 id 不能为空");
			return rpd;
		}
		if(StringUtil.isEmpty(type)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("参数 type 不能为空");
			return rpd;
		}
		
		int n = 0;
		switch(type) {
			case 1:
				n = noteMapper.updateFavor(id);break;
			case 2:
				n = replyMapper.updateFavor(Integer.parseInt(id));break;
		}
		
		if(n==1) {
			rpd.setCode(BusinessStatus.SUCCESS);
			rpd.setMessage("success");
		}else {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("fail");
		}
		
		return rpd;
		
	}
	
}
