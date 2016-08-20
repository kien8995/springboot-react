import React, {PropTypes} from "react";
import TextInput from "../common/TextInput.jsx";
import SelectInput from "../common/SelectInput.jsx";

const CourseForm = ({course, alllAuthors, onSave, onChange, loading, error}) => {
    return (
        <form>
            <h1>Manage Course</h1>
            <TextInput
                name="title"
                label="Title"
                value={course.title}
                onChange={onChange}
                disabled={loading}
                error={error.title}/>

            <SelectInput
                name="authorId"
                label="Author"
                value={course.authorId}
                defaultOption="Select Author"
                options={alllAuthors}
                onChange={onChange}
                disabled={loading}
                error={error.authorId}/>

            <TextInput
                name="category"
                label="Category"
                value={course.category}
                onChange={onChange}
                disabled={loading}
                error={error.category}/>

            <TextInput
                name="length"
                label="Length"
                value={course.length}
                onChange={onChange}
                disabled={loading}
                error={error.length}/>
            <br/>
            <input
                type="submit"
                disabled={loading}
                value={loading ? "Saving..." : "Save"}
                className="btn btn-primary"
                onClick={onSave}/>
        </form>
    );
};

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    alllAuthors: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.object
};

export default CourseForm;