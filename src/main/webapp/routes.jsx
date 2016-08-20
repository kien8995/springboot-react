import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App.jsx";
import HomePage from "./components/home/HomePage.jsx";
import CoursePage from "./components/course/CoursePage.jsx";
import AboutPage from "./components/about/AboutPage.jsx";
import ManageCoursePage from "./components/course/ManageCoursePage.jsx";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="courses" component={CoursePage} />
        <Route path="course" component={ManageCoursePage}>
            <Route path=":id" component={ManageCoursePage} />
        </Route>
        <Route path="about" component={AboutPage} />
    </Route>
);
