import * as api from '../../api';
import { AUTH } from "../../constants/actionTypes";

export const login = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.login(formData);
      if (data.error) return console.log(data.error.message)
      dispatch({ type: AUTH, payload: data.result })
      navigate('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signup(formData);
      if (data.error) return console.log(data.error.message);
      alert(data.message)
      // dispatch({ type: AUTH, payload: data.user })
      navigate('/');
    } catch (error) {
       console.log(error)
    }
}