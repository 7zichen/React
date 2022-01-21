package com.aowin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aowin.constants.BusinessStatus;
import com.aowin.dao.LoginMapper;
import com.aowin.dao.UserMapper;
import com.aowin.entity.Login;
import com.aowin.entity.Respond;
import com.aowin.entity.User;
import com.aowin.utils.StringUtil;
import com.aowin.utils.TokenUtil;

@RestController
@RequestMapping("/sys")
public class LoginController {
	
	@Autowired
	private LoginMapper loginMapper;
	
	@Autowired
	private UserMapper userMapper;
	private Respond rpd;

	/**
	 * 登录
	 * @param login
	 * @return
	 */
	@RequestMapping("/login")
	public Respond login(Login login) {
		rpd = new Respond();
		if(StringUtil.isEmpty(login.getUsername()) || StringUtil.isEmpty(login.getPassword())) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			rpd.setMessage("账号或密码不能为空");
			return rpd;
		}
		
		login = loginMapper.login(login);
		if(login == null) {
			rpd.setCode(BusinessStatus.FAIL);
			rpd.setMessage("账号或密码错误");
			return rpd;
		}

		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		
		Map<String, Object> data = new HashMap<>();
		String username = login.getUsername();
		User user = userMapper.getUserByUsername(username);
		data.put("user", user);
		data.put("token", TokenUtil.createToken(user.getUserId(), username));
		rpd.setData(data);
		return rpd;
	}
	
	@RequestMapping("/logout")
	public Respond logout() {
		rpd = new Respond();
		rpd.setCode(BusinessStatus.SUCCESS);
		rpd.setMessage("success");
		rpd.setData("成功退出");
		return rpd;
	}

}
