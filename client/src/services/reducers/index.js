import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducer from "./posts";

export default combineReducers({
    posts: postReducer,
    auth: authReducer
})