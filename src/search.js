import React from "react";
import { connect } from "react-redux";
import { getSearchForUser } from "./actions";

class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {}
    render() {
        return (
            <React.Fragment>
                <div className="autocomplete">
                    <input
                        ref={elem => {
                            this.text = elem;
                        }}
                        onChange={e => {
                            this.props.dispatch(
                                getSearchForUser(e.target.value)
                            );
                            console.log("inside search", e.target.value);
                        }}
                        className="searchForm form-control mr-sm-2"
                        name="text"
                        type="text"
                        placeholder="Search for users"
                        autoComplete="off"
                    />
                    <button
                        className="btn btn-succes mr_sm-2"
                        onClick={() => {
                            this.props.dispatch(
                                getSearchForUser(this.text.value)
                            );
                            this.text.value = "search for friend";
                        }}
                    >
                        Search
                    </button>
                    <div className="searchResults bg-white ">
                        {this.props.searchResults &&
                            this.props.searchResults.length !== 0 &&
                            this.props.searchResults.map(user => {
                                return (
                                    <div className="" key={user.id}>
                                        <img src={user.image} />
                                        <p>
                                            {user.first} {user.last}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        searchResults: state.searchResults
    };
};
export default connect(mapStateToProps)(Search);
