package com.aowin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan("com.aowin.dao")
@ServletComponentScan("com.aowin.filter")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
