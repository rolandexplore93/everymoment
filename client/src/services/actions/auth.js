// import * as api from '../../api';
// import { AUTH } from "../../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in

      navigate('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up

      navigate('/');

    } catch (error) {
       console.log(error)
    }
}





// export const getPost = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchPosts();
//         dispatch({
//           type: FETCH_ALL,
//           payload: data,
//         });

//     } catch (error) {
//         console.log(error)
//     }
// }