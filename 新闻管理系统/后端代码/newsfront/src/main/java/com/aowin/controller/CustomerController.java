package com.aowin.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aowin.constants.BusinessStatus;
import com.aowin.dao.CustomerMapper;
import com.aowin.entity.Customer;
import com.aowin.entity.Respond;
import com.aowin.utils.DateUtil;
import com.aowin.utils.StringUtil;
import com.aowin.utils.TokenUtil;

@RestController
@RequestMapping("/cus")
public class CustomerController {
	@Autowired
	private CustomerMapper customerMapper;
	
	private Respond rpd;
	
	private boolean checkCustomer(Customer customer) {
		if(StringUtil.isEmpty(customer.getAccount())) {
			rpd.setMessage("参数 account 不能为空");
			return false;
		}
		if(StringUtil.isEmpty(customer.getPassword())) {
			rpd.setMessage("参数 password 不能为空");
			return false;
		}
		if(StringUtil.isEmpty(customer.getTel())) {
			rpd.setMessage("参数 tel 不能为空");
			return false;
		}
		
		return true;
	}
	
	@RequestMapping("/login")
	public Respond login(String account, String password) {
		rpd = new Respond();
		if(StringUtil.isEmpty(account) || StringUtil.isEmpty(password)) {
			rpd.setCode(3);
			rpd.setMessage("账号或密码不能为空");
			return rpd;
		}
		
		Map<String,String> map = new HashMap<>();
		map.put("account", account);
		map.put("password", password);
		Customer cus = customerMapper.login(map);
		if(cus == null) {
			rpd.setCode(4);
			rpd.setMessage("账号或密码错误");
			return rpd;
		}
		
		rpd.setCode(2);
		rpd.setMessage("success");
		Map<String, Object> data = new HashMap<>();
		data.put("user", cus);
		data.put("token", TokenUtil.createToken(account, account));
		rpd.setData(data);
		return rpd;
	}
	
	@RequestMapping("/registe")
	public Respond registe(Customer customer,@RequestParam(value="file",required = false) MultipartFile file) {
		rpd = new Respond();
		System.out.println("file:"+file);
		if(!checkCustomer(customer)) {
			rpd.setCode(BusinessStatus.PARAM_ERROR);
			return rpd;
		}
		Customer cus = customerMapper.selectCustomerByAccount(customer.getAccount());
		if(cus != null) {
			rpd.setCode(4);
			rpd.setMessage("fail");
			rpd.setData("账号 '"+customer.getAccount()+"' 已注册");
			return rpd;
		}
		if(file != null && !file.isEmpty()) {
			String fileName = file.getOriginalFilename();
			String ext = fileName.substring(fileName.lastIndexOf('.'));
			String path = DateUtil.currentTime("HmsS") + ext;
			try {
				File dest = new File("D:\\upload\\avatar\\"+path);
				file.transferTo(dest);
				customer.setPortrait("avatar/"+path);
				System.out.println("文件上传成功");
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				rpd.setCode(BusinessStatus.FAIL);
				rpd.setMessage("fail");
				rpd.setData("文件上传失败");
				return rpd;
			}
		}else {
			customer.setPortrait("avatar/avator.png");
		}
		customerMapper.registe(customer);
		rpd.setCode(2);
		rpd.setMessage("success");
		rpd.setData("注册成功");
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
