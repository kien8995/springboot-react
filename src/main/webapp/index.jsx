/*eslint-disable import/default*/
import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {renderToString} from "react-dom/server";
import {Router, RouterContext, match, browserHistory} from "react-router";
import {Provider} from "react-redux";
import routes from "./routes.jsx";
import configureStore from "./store/configureStore";
import {loadCourses} from "./actions/courseActions";
import {loadAuthors} from "./actions/authorActions";
import "./styles/styles.global.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/toastr/build/toastr.min.css";

// const store = configureStore();
// store.dispatch(loadCourses());
// store.dispatch(loadAuthors());


if (typeof window !== "undefined") {

    const store = configureStore(window.__INITIAL_STATE__);

    render(
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>,
        document.getElementById("app")
    );
} else {
    // When running in Nashorn, the process object doesn't exist. Define it
    // so that when the React code tests for production mode, it succeeds.
    process = {
        env: {
            NODE_ENV: "production"
        }
    };
}

export function renderApp(path, state) {
    const store = configureStore(state);
    let renderResult = "";
    
    match({ routes: routes, location: path }, (error, redirectLocation, renderProps) => {
        if (renderProps) {
            renderResult = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );
        }
        else {
            console.error(`Failed to render app for path [${path}], error: [${error}]`);
        }
    });

    return renderResult;
}
