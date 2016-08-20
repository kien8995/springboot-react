import expect from "expect";
import React from "react";
import TestUtils from "react-addons-test-utils";
import CourseForm from "./CourseForm.jsx";

function setup(loading = true) {
    let props = {
        course: {},
        loading: loading,
        error: { title: "", authorId: "", category: "", length: "" },
        onSave: () => { },
        onChange: () => { }
    };
    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe("CourseForm via React TestUtils", () => {
    it("renders form and h1", () => {
        const {output} = setup();
        expect(output.type).toBe("form");
        let [ h1 ] = output.props.children;
        expect(h1.type).toBe("h1"); 
    });

    it("Save button is labeled 'Save' when not loading...", () => {
        const {output} = setup(false);
        const submitButton = output.props.children[6];
        expect(submitButton.props.value).toBe("Save");
    });

    it("Save button is labeled 'Saving...' when loading...", () => {
        const {output} = setup(true);
        const submitButton = output.props.children[6];
        expect(submitButton.props.value).toBe("Saving...");
    });
});