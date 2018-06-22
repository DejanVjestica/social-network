import React from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <React.Fragment>
            <Link to="/">
                <img
                    className=""
                    src="/images/logo.jpg"
                    alt="Generic placeholder image"
                />
            </Link>
        </React.Fragment>
    );
}
export default Logo;
