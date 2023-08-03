import "./Auth.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import primaryComponents from "../../../components/primaryComponents";
import { GoogleLogin } from '@react-oauth/google';
// import { gapi } from "gapi-script";
import jwt_decode from "jwt-decode";
import { AUTH } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signup, login } from "../../../services/actions/auth";

const initialData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  const [formData, setFormData] = useState(initialData);

  // const [showPassword, setShowPassword] = useState(false)
  // const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();

  // jwt login and signup implementation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp){
      dispatch(signup(formData, navigate))
    } else (
      dispatch(login(formData, navigate))
    )
  };
  
  const handleChange = (e) => {
    const targetField = {...formData, [e.target.name]: e.target.value};
    setFormData(targetField);
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  // const handleShowPassword = () => {
  //   setShowPassword((prevshowPassword) => !prevshowPassword)
  // }

  // Google login implementation
  const successGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse?.credential
    const data = jwt_decode(credentialResponse.credential)

    try {
      dispatch({ type: AUTH, payload: { data, token } });
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  
  useEffect(() => {
    const token = user?.token;
    // JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  const failedGoogleLogin = (error) => {
    console.log(error)
    console.log('Login Failed');
  };

  // const successResponse = async (res) => {
  //   console.log(res)
  //   const result = res?.profileObj;   // Using ? will return undefined if it can't find the profileObj
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "AUTH", data: { result, token } });

  //     navigate('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const responseGoogle = (e) => {
  //   console.log(e)
  //   console.log("Google sign in was unsuccessful... Try again");
  // }

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   }

  //   gapi.load("client:auth2", start);
  // });

  return (
    <div className="auth">
      <FontAwesomeIcon icon={faLock} />
      <h3>{isSignUp ? "Sign Up" : "Sign In"}</h3>
      <form className="form" onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="form__names">
            <primaryComponents.Input
              name={"firstname"}
              type={"text"}
              placeholder={"Firstname"}
              autoFocus={true}
              onChange={handleChange}
            />
            <primaryComponents.Input
              name={"lastname"}
              type={"text"}
              placeholder={"Lastname"}
              onChange={handleChange}
            />
          </div>
        )}
        <primaryComponents.Input
          name={"email"}
          type={"email"}
          placeholder={"email"}
          onChange={handleChange}
        />
        <primaryComponents.Input
          name={"password"}
          type={"password"}
          placeholder={"password"}
          onChange={handleChange}
        />
        {isSignUp && (
          <primaryComponents.Input
            name={"confirmPassword"}
            type={"password"}
            placeholder={"Repeat password"}
            onChange={handleChange}
          />
        )}
        {isSignUp ? (
          <primaryComponents.Input type={"submit"} value="Sign Up" />
        ) : (
          <primaryComponents.Input type={"submit"} value="Sign in" />
        )}
        <GoogleLogin
          onSuccess={successGoogleLogin}
          onError={failedGoogleLogin}
        />
        {/* {!isSignUp &&
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <button 
                style={{color: 'red', padding: '3px', cursor: 'pointer'}}
                color="primary"
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}>
                Sign in with Google
              </button>
            )}
            onSuccess={successResponse}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        } */}
      </form>
      {isSignUp ? (
        <p style={{ color: '#000'}}>
          Already have an account? <span className="auth-switch-in" onClick={switchMode}>Sign in</span>
        </p>
      ) : (
        <p style={{ color: '#000'}}>
          Don't have an account? <span className="auth-sign-up" onClick={switchMode}>Click here to create an account</span>
        </p>
      )}
    </div>
  );
};

export default Auth;
