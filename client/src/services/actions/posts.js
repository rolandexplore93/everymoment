import * as api from '../../api'; // * means import all the api calls/methods inside the api folder as api
import { FETCH_ALL, CREATE, UPDATE, LIKEPOST, DELETE, FETCH_POSTS_BY_SEARCH, START_LOADING, END_LOADING, GET_POST_BY_ID } from "../../constants/actionTypes";

// getPostByPagination
export const getPost = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message)
    }
};

// getPostById
export const getPostById = (postID) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING});
        const { data } = await api.getPostById(postID);
        dispatch({ type: GET_POST_BY_ID, payload: data });
        dispatch({ type: END_LOADING});
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPostsBySearch(searchQuery);
        dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data.posts});
        dispatch({ type: END_LOADING });
    } catch (error) {
        navigate('/');
        return console.log(error.response.data.message)
    }
}

export const createPost = (newpost, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(newpost);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
        navigate(`/posts/${data.post._id}`);
    } catch (error) {
        console.log(error)
    }
}

export const editPost = (id, post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.editPost(id, post)
        dispatch({ type: UPDATE, payload: data.postUpdated})
        navigate('/');
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKEPOST, payload: data.updatedPostLikeCount})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}