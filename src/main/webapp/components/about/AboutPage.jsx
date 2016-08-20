import React, {Component} from "react";
import styles from "./style.module.css";

class AboutPage extends Component {
    render () {
        return (
            <div>
                <h1 className={styles.aaa}>About</h1>
                <p>This application uses React, Redux, React Router and a veriety of other helpful libraries.</p>     
            </div>
        );
    }
}

export default AboutPage;