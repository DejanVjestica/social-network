import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
// import Axios from "axios";

// import Register from "./Register";
import Welcome from "./Welcome";
// import Logo from "./logo";
import App from "./App";

const store = createStore(reducer, applyMiddleware(reduxPromise));

let component;
if (location.pathname == "/welcome") {
    console.log("loged out");
    component = <Welcome />;
} else {
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );

    // component = <Logo />;
    console.log("logged in");
}
ReactDOM.render(component, document.getElementById("root"));

// function Welcomme() {
//     return (
//         <div>
//             <h1>Hello, world!</h1>
//         </div>
//     );
// }
// ReactDOM.render(component, document.getElementById("root"));
//
// function tick() {
// }
// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { date: new Date() };
//     }
//     componentDidMount() {
//         this.timerId = setInterval(() => this.thick(), 1000);
//     }
//     componentWillUnmount() {
//         clearInterval(this.timerId);
//     }
//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }
//     // Render ---------------------------
//     render() {
//         return (
//             <div>
//                 <h1>Hello, world!</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(<Clock />, document.getElementById("root"));
// // function tick() {}
//
// setInterval(tick, 1000);
