import {combineReducers} from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

export const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress
});
