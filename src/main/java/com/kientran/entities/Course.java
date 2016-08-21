package com.kientran.entities;

public class Course {
	private String id;
	private String title;
	private String watchHref;
	private String authorId;
	private String length;
	private String category;

	public Course() {
		super();
	}

	public Course(String id, String title, String watchHref, String authorId, String length, String category) {
		super();
		this.id = id;
		this.title = title;
		this.watchHref = watchHref;
		this.authorId = authorId;
		this.length = length;
		this.category = category;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getWatchHref() {
		return watchHref;
	}

	public void setWatchHref(String watchHref) {
		this.watchHref = watchHref;
	}

	public String getAuthorId() {
		return authorId;
	}

	public void setAuthorId(String authorId) {
		this.authorId = authorId;
	}

	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
}
