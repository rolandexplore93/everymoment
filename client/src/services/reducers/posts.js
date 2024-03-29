import { FETCH_ALL, CREATE, UPDATE, LIKEPOST, DELETE, LOGOUT, FETCH_POSTS_BY_SEARCH, START_LOADING, END_LOADING, GET_POST_BY_ID, COMMENTS } from "../../constants/actionTypes";

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL: 
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                message: action.payload.message
            }
        case GET_POST_BY_ID:
            return { ...state, post: action.payload.post, message: action.payload.message}
        case FETCH_POSTS_BY_SEARCH:
            return { ...state, posts: action.payload}
        case CREATE:
            return { ...state, posts: [ ...state.posts, action.payload.post] }
        case UPDATE: 
        case LIKEPOST:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        case COMMENTS: 
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload.updatedPost._id) return action.payload.updatedPost;
                    return post
                })
            }
        case DELETE: 
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload)};
        case LOGOUT:
            return [];
        default: 
            return state
    }
}

export default postReducer