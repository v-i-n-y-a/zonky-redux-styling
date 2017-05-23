import axios from "axios";

export function fetchLoans() {
  return function(dispatch) {
    dispatch({type: "FETCH_LOANS", payload: null});
    axios.get("/loans/marketplace")
    .then((response) => {
      dispatch({type: "FETCH_LOANS_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_LOANS_REJECTED", payload: err.message})
    })
  };
}
