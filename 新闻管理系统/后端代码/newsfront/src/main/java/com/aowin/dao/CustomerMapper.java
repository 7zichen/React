package com.aowin.dao;

import java.util.Map;

import com.aowin.entity.Customer;

public interface CustomerMapper {
	
	public Customer login(Map map);
	public void registe(Customer customer);
	public Customer selectCustomerByAccount(String account);
}
