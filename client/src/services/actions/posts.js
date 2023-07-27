import * as api from '../../api'; // * means import all the api calls/methods inside the api folder as api
import { FETCH_ALL, CREATE, UPDATE, LIKEPOST, DELETE } from "../../constants/actionTypes";

export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({
          type: FETCH_ALL,
          payload: data.posts,
        });
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (newpost) => async (dispatch) => {
    try {
        const { data } = await api.createPost(newpost);
        dispatch({ type: CREATE, payload: data.post });
    } catch (error) {
        console.log(error.message)
    }
}

export const editPost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.editPost(id, post)
        console.log(data)
        dispatch({ type: UPDATE, payload: data.postUpdated})
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKEPOST, payload: data.updatedPostLikeCount})
    } catch (error) {
        console.log(error)
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