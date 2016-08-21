import axios from "axios";

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
    return replaceAll(course.title, " ", "-");
};

class CourseApi {
    static getAllCourses() {
        return axios(
            {
                url: "http://localhost:8080/api/courses",
                timeout: 20000,
                method: "get",
                responseType: "json"
            }
        );
    }

    static saveCourse(course) {
        return axios(
            {
                url: "http://localhost:8080/api/courses",
                timeout: 20000,
                method: "post",
                responseType: "json",
                data: {
                    id: course.id,
                    watchHref: course.watchHref,
                    title: course.title,
                    authorId: course.authorId,
                    length: course.length,
                    category: course.category
                }
            }
        );
    }
}

export default CourseApi;