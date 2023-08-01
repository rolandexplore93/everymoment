import { googleLogout } from "@react-oauth/google";
import { AUTH, LOGOUT } from "../../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

            return { ...state, authData: action?.payload};
        
        case LOGOUT:
            localStorage.clear();
            googleLogout()
            return { ...state, authData: null};
        
        default: 
            return state
    }
}

export default authReducer