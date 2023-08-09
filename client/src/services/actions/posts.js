import * as api from '../../api'; // * means import all the api calls/methods inside the api folder as api
import { FETCH_ALL, CREATE, UPDATE, LIKEPOST, DELETE } from "../../constants/actionTypes";

export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        if (data.error) return console.log(data.error.message)
        dispatch({ type: FETCH_ALL, payload: data.posts });
    } catch (error) {
        console.log(error.message)
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.getPostsBySearch(searchQuery);
        if (data.error) return console.log(data.error.message);
        // console.log(data)
        console.log(data.posts)
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (newpost, navigate) => async (dispatch) => {
    console.log(newpost)
    try {
        const { data } = await api.createPost(newpost);
        if (data.error) return console.log(data.error.message)
        dispatch({ type: CREATE, payload: data.post });
        navigate('/');

    } catch (error) {
        console.log(error.message)
    }
}

export const editPost = (id, post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.editPost(id, post)
        console.log(data)
        dispatch({ type: UPDATE, payload: data.postUpdated})
        navigate('/');
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        console.log(data)
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