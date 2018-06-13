export default function(state = {}, action) {
    if (action.type == "RECIEVEF_RIENDS_AND_WANNABES") {
        state = Object.assign({}, state, {
            test: action.test
        });
        console.log("reduxs", action.test);
    }
    return state;
}
