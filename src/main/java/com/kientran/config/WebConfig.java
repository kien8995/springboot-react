package com.kientran.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**").allowCredentials(false).allowedOrigins("*")
						.allowedMethods("PUT", "POST", "GET", "OPTIONS", "DELETE")
						.exposedHeaders("Authorization", "Content-Type");
				;
			}
		};
	}

	@Bean
	public WebMvcConfigurer resourcesConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addResourceHandlers(ResourceHandlerRegistry registry) {
				registry.addResourceHandler("/resources/static/dist/bundle.js", "/resources/static/dist/styles.css")
						.addResourceLocations("/resources/");
			}
		};
	}
}
