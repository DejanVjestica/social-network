import { connect } from "react-redux";
import { recieveFriendsAndWannabes } from "./actions.js";
import React from "react";

class Friends extends React.Component {
    //
    render() {
        return (
            <div>
                <p>redux</p>
                <button>click</button>
            </div>
        );
    }
    componentDidMount() {
        this.props.dispatch(recieveFriendsAndWannabes);
    }
}
const mapStateToProps = function(state) {
    return {
        users: state.users && state.users.filter(user => user.hot == null)
    };
};
// const ;
export default connect(mapStateToProps)(Friends);
