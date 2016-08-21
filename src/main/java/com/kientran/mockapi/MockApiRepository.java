package com.kientran.mockapi;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

import com.kientran.entities.Author;
import com.kientran.entities.Course;

@Repository
public class MockApiRepository {
	private final ConcurrentMap<String, Course> courses = new ConcurrentHashMap<>();
	private final List<Author> authors = new ArrayList<>();

	@PostConstruct
	public void populateRepository() {
		this.save(new Course("react-flux-building-applications", "Building Applications in React and Flux",
				"http://www.pluralsight.com/courses/react-flux-building-applications", "cory-house", "5:08",
				"JavaScript"));
		this.save(new Course("clean-code", "Clean Code: Writing Code for Humans",
				"http://www.pluralsight.com/courses/writing-clean-code-humans", "cory-house", "3:10",
				"Software Practices"));
		this.save(new Course("architecture", "Architecting Applications for the Real World",
				"http://www.pluralsight.com/courses/architecting-applications-dotnet", "cory-house", "2:52",
				"Software Architecture"));
		this.save(new Course("career-reboot-for-developer-mind",
				"Becoming an Outlier: Reprogramming the Developer Mind",
				"http://www.pluralsight.com/courses/career-reboot-for-developer-mind", "cory-house", "2:30", "Career"));
		this.save(new Course("web-components-shadow-dom", "Web Component Fundamentals",
				"http://www.pluralsight.com/courses/web-components-shadow-dom", "cory-house", "5:10", "HTML5"));

		this.authors.add(new Author("cory-house", "Cory", "House"));
		this.authors.add(new Author("scott-allen", "Scott", "Allen"));
		this.authors.add(new Author("dan-wahlin", "Dan", "Wahlin"));
	}

	public Course save(Course course) {
		String id = course.getId();
		if (id == null || id.equals("")) {
			id = course.getTitle().replaceAll(" ", "-");
			course.setId(id);
		}
		course.setWatchHref("http://localhost:8080/" + id);
		this.courses.put(id, course);
		return course;
	}

	public Iterable<Course> findAllCourses() {
		return this.courses.values();
	}

	public List<Author> findAllAuthors() {
		return this.authors;
	}
}
