import axios from "./axios";

export function recieveFriendsAndWannabes() {
    // here comes axios request
    axios.get("/friends").then(function(req, res) {
        return {
            type: "RECIEVEF_RIENDS_AND_WANNABES",
            test: "testing"
        };
    });
}
