import React from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <div className="logo ">
            <Link to="/">
                <img
                    className=""
                    src="/images/logo.jpg"
                    alt="Generic placeholder image"
                />
            </Link>
        </div>
    );
}
export default Logo;
