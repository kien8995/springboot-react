import * as types from "./actionTypes";
import CourseApi from "../api/courseApi";
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return CourseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return CourseApi.saveCourse(course).then(response => {
            console.log(response.status);
            if (response.status === 201) {
                dispatch(createCourseSuccess(response.data));
            } else if (response.status === 200) {
                dispatch(updateCourseSuccess(response.data));
            } else {
                console.log("error");
                throw (response);
            }
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}