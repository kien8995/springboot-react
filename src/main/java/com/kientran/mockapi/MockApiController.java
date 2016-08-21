package com.kientran.mockapi;

import static com.kientran.utils.State.populateModel;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MockApiController {

	@Inject
	private MockApiRepository repository;

	@RequestMapping(value = { "/", "/courses", "/about", "/course/*" }, method = GET)
	public String showSignIn(Model model, HttpServletRequest request) {
		populateModel(model, request);
		System.out.println("call courses controller...");
		model.addAttribute("courses", repository.findAllCourses());
		model.addAttribute("authors", repository.findAllAuthors());
		return "index";
	}
}
