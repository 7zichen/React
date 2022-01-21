package com.aowin.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import com.aowin.dao.RoleMapper;

@WebFilter(urlPatterns = { "/news/*", "/comment/*", "/verify/*" }, filterName = "PermissionFilter")
@Order(3)
public class PermissionFilter implements Filter {
	@Autowired
	private RoleMapper roleMapper;

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) arg0;
		String uri = req.getRequestURI();
		// 取剩下 路径的前一级目录
		String path = uri.substring(0, uri.indexOf('/', 1) + 1);
		System.out.println(path);

		String username = (String) req.getAttribute("login");
		String roleUri = roleMapper.selectUriByUsername(username);
		if (path != null &&path.startsWith(roleUri)) {
			arg2.doFilter(arg0, arg1);
			return;
		}else {
			arg1.setCharacterEncoding("utf-8");
			arg1.setContentType("text/json;charset=utf-8");
			PrintWriter out = arg1.getWriter();
			out.print("{\"code\": 1, \"message\": \"您当前没有权限访问，请联系管理员\"}");
			out.flush();
			out.close();
		}
	}
}
