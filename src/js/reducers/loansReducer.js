export default function reducer (state={
    loans: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_LOANS": {
            return {...state, fetching: true};
        }
        case "FETCH_LOANS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_LOANS_FULFILLED": {
            return {...state, 
                fetching: false, 
                fetched: true, 
                loans: action.payload};
        }
    }
    return state;
}