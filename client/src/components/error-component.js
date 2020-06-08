import React, { Component } from "react";
import '../App.css';
import "../shared/stylesheets/error-style.css"
const ErrorComponent = () => {
    return (
        <div className="overlay  error-body bg-warning">
            <div className="overlay overlay--vignette">
                <div className="flex-full-justify">
                    <div className="flex-inner">
                        <div className="text-center text-white">
                            <h1>404 File Not Found</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ErrorComponent;
