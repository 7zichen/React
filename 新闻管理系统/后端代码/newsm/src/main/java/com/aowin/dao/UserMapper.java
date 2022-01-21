package com.aowin.dao;

import com.aowin.entity.User;

public interface UserMapper {
	
	public User getUserById(String userId);
	public User getUserByUsername(String username);

}
