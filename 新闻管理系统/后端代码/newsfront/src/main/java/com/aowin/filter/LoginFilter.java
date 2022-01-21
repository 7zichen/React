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
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;

import com.aowin.utils.TokenUtil;

@WebFilter(urlPatterns= {"/comment/*", "/cus/logout"}, filterName="LoginFilter")
@Order(2)
public class LoginFilter implements Filter{

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) arg0;
		HttpServletResponse resp = (HttpServletResponse) arg1;
		String token = req.getHeader("X-Token");
		if(token==null || token.trim().equals("")) {
			writeResponse(resp, "请先登录");
			return;
		}
		
		int n = TokenUtil.verify(token, req);
		String msg = null;
		if(n == 1) {
			arg2.doFilter(arg0, arg1);
		} else if(n==2) {
			msg = "token过期，请重新登录";
			writeResponse(resp, msg);
			return;
		} else if(n==0) {
			msg = "token验证失败，请重新登录";
			writeResponse(resp, msg);
			return;
		}
	}
	
	private void writeResponse(HttpServletResponse resp, String msg) throws IOException {
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/json;charset=utf-8");
		PrintWriter out = resp.getWriter();
		out.print("{\"code\":4,\"message\":\""+msg+"\"}");
		out.flush();
		out.close();
	}

}
