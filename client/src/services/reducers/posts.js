import { FETCH_ALL, CREATE, UPDATE, LIKEPOST, DELETE, LOGOUT } from "../../constants/actionTypes";

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return action.payload
        case CREATE:
            return [ ...posts, action.payload]
        case UPDATE: 
        case LIKEPOST:
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case DELETE: 
            return posts.filter(post => post._id !== action.payload);
        case LOGOUT:
            return [];
        default: 
            return posts
    }
}

export default postReducer