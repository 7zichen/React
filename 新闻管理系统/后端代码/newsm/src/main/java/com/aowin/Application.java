package com.aowin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan("com.aowin.dao")
@ServletComponentScan("com.aowin.filter")
public class Application {
	// @SpringBootApplication = @EnableAutoConfiguration+@ComponentScan
	// 默认ioc的扫描路径为 当前启动类所在的目录以及其子目录
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
