import expect from "expect";
import React from "react";
import {mount, shallow} from "enzyme";
import TestUtils from "react-addons-test-utils";
import CourseForm from "./CourseForm.jsx";

function setup(loading) {
    const props = {
        course: {},
        loading: loading,
        error: {},
        onSave: () => { },
        onChange: () => { }
    };

    return shallow(<CourseForm {...props} />);
}

describe("CourseForm via Enzyme", () => {
    it("renders forms and h1", () => {
        const wrapper = setup(false);
        expect(wrapper.find("form").length).toBe(1);
        expect(wrapper.find("h1").text()).toEqual("Manage Course");
    });

    it("Save button is labeled 'Save' when not loading...", () => {
        const wrapper = setup(false);
        expect(wrapper.find("input").props().value).toBe("Save");
    });

    it("Save button is labeled 'Saving...' when loading...", () => {
        const wrapper = setup(true);
        expect(wrapper.find("input").props().value).toBe("Saving...");
    });
});