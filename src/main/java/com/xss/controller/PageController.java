package com.xss.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 *  页面流转(暂时不用)
 */
@Controller
public class PageController {
	@RequestMapping("{module}/{module2}/{url}.html")
	public String module(@PathVariable("module") String module, @PathVariable("module2") String module2,@PathVariable("url") String url){
		return  module + "/" + module2 + "/" + url + ".html";
	}
	
	@RequestMapping("{module}/{url}.html")
	public String module(@PathVariable("module") String module, @PathVariable("url") String url){
		return  module + "/" + url + ".html";
	}

	@RequestMapping("{url}.html")
	public String url(@PathVariable("url") String url){
		return url + ".html";
	}

	@RequestMapping("/")
	public String index(){
		return "index.html";
	}
}
