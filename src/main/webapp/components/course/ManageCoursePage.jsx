import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm.jsx";
import toastr from "toastr";

class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            error: { title: "", authorId: "", category: "", length: "" },
            loading: false
        };

        this.updateCouseState = this.updateCouseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id !== nextProps.course.id) {
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }


    updateCouseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({ loading: true });
        this.props.actions.saveCourse(this.state.course).then(() => this.redirect()).catch(error => {
            toastr.error(error);
            this.setState({ loading: false });
        });
    }

    redirect() {
        this.setState({ loading: false });
        toastr.success("Course saved.");
        this.context.router.push("/courses");
    }

    render() {
        return (
            <CourseForm
                alllAuthors={this.props.authors}
                course={this.state.course}
                onChange={this.updateCouseState}
                onSave={this.saveCourse}
                error={this.state.error}
                loading={this.state.loading}/>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is avaiable on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getCourseById(courses, courseId) {
    const course = courses.filter(course => course.id === courseId);
    if (course) {
        return course[0];
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; //from the path '/course/:id'

    let course = { id: "", watchHref: "", title: "", authorId: "", length: "", category: "" };

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + " " + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);