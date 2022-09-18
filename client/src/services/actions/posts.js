import * as api from '../../api';
import { FETCH_ALL, CREATE, UPDATE, LIKEPOST, DELETE } from "../../constants/actionTypes";

export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({
          type: FETCH_ALL,
          payload: data,
        });

    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        
    } catch (error) {
        console.log(error)
    }
}

export const editPost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.editPost(id, post)
        dispatch({ type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKEPOST, payload: data})
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