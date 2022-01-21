package com.aowin.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aowin.dao.UserMapper;
import com.aowin.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenUtil {
	
	@Autowired
	private UserMapper userMapper;
	
	/**
     * 过期时间 30分钟
     */
     private static final long EXPIRE_TIME = 30*60*1000;
    /**
     * 加密密钥
     */
    private static final String KEY = "aowin";

    
    private static TokenUtil tokenUtil;

	@PostConstruct
	public void init() {
		tokenUtil = this;
		tokenUtil.userMapper = this.userMapper;
	}
	
	public static String createToken(String id, String username) {
		Map<String,Object>  header = new HashMap<>();
        header.put("typ","JWT");
        header.put("alg","HS256");
		
		JwtBuilder builder = Jwts.builder().setHeader(header)
		.setId(id)
		.setExpiration(new Date(System.currentTimeMillis() + EXPIRE_TIME))
		.setSubject(username)
		.setIssuedAt(new Date())
		.signWith(SignatureAlgorithm.HS256, KEY);
		
		return builder.compact();
	}
	
	/**
	 * 验证 token 是否有效
	 * @param token 请求头中携带的 token
	 * @return 2-token过期；1-token认证通过；0-token认证失败
	 */
	public static int verify(String token,HttpServletRequest req) {
		Claims claims = null;
		try {
			// token 过期后，会抛出ExpiredJwtException 异常
			claims = Jwts.parser().setSigningKey(KEY).parseClaimsJws(token).getBody();
			// 从 token 中获取用户 id，查询该 Id 的用户是否存在，存在则 token 验证通过
			String id = claims.getId();
			User user = tokenUtil.userMapper.getUserById(id);
			if(user != null){
				req.setAttribute("login", user.getUsername());
				return 1;
			}else{
				return 0;
			}
		} catch (ExpiredJwtException e) {
			e.printStackTrace();
			return 2;
		} catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		
	}
}
