import * as api from '../../api';

export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts('http://localhost:5000');
        dispatch({
          type: "FETCH_ALL",
          payload: data,
        });

    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data });
        
    } catch (error) {
        console.log(error)
    }
}

export const editPost = (id, updatedPost) => async (dispatch) => {
    try {
        const {data} = await api.editPost(id, updatedPost)
        dispatch({ type: 'UPDATE', payload: data})
        
    } catch (error) {
        console.log(error)
    }
}