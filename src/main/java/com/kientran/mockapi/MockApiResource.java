package com.kientran.mockapi;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kientran.entities.Author;
import com.kientran.entities.Course;
import com.kientran.utils.Functions;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class MockApiResource {

	@Inject
	private MockApiRepository repository;

	@RequestMapping(path = "/courses", method = POST)
	public ResponseEntity<?> add(@RequestBody Course course) {
		String id = course.getId();
		repository.save(course);
		if (id == null || id.equals("")) {
			return new ResponseEntity<>(course, HttpStatus.CREATED);
		}
		return new ResponseEntity<>(course, HttpStatus.OK);
	}

	@RequestMapping(path = "/courses", method = GET)
	public List<Course> courses() {
		// You shouldn't do this in a real app - you should page the data.
		return Functions.map(repository.findAllCourses(), c -> c);
	}

	@RequestMapping(path = "/authors", method = GET)
	public List<Author> authors() {
		// You shouldn't do this in a real app - you should page the data.
		return Functions.map(repository.findAllAuthors(), c -> c);
	}
}
