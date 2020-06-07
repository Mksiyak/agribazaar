import React, { Component } from "react";
import '../App.css';
import "../shared/stylesheets/error-style.css"
class Error extends Component {
    constructor(props) {
        super(props);
        this.state={
            errorcode : 404,
            errormsg : "page not found",
            errorstack : "NotFoundError: Not Found at /home/mksiyak/Desktop/projects/farmer-Market/app.js:52:10 at Layer.handle [as handle_request] (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/layer.js:95:5) at trim_prefix (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:317:13) at /home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:284:7 at Function.process_params (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:335:12) at next (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:275:10) at /home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:635:15 at next (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:260:14) at Function.handle (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:174:3) at router (/home/mksiyak/Desktop/projects/farmer-Market/node_modules/express/lib/router/index.js:47:12)"
        }
    }
    render() {
        return (
            <div className="overlay  error-body bg-warning">
                <div className="overlay overlay--vignette">
                    <div className="flex-full-justify">
                        <div className="flex-inner">
                            <div className="text-center text-white">
                                <h1>{this.state.errorcode}</h1>
                                <h3 className="text-center text-white">
                                    {this.state.errormsg}
                                </h3>
                                <p>
                                    {this.state.errorstack}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Error;