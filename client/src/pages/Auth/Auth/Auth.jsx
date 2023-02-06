import "./Auth.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import primaryComponents from "../../../components/primaryComponents";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  // const [formDatac setFormDatac] = useState(initialData);
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const successResponse = async (res) => {
    console.log(res)
    const result = res?.profileObj;   // Using ? will return undefined if it can't find the profileObj
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const responseGoogle = (e) => {
    console.log(e)
    console.log("Google sign in was unsuccessful... Try again");
  }

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
              onChange={(e) => e.target.value}
            />
            <primaryComponents.Input
              name={"lastname"}
              type={"text"}
              placeholder={"Lastname"}
              onChange={(e) => e.target.value}
            />
          </div>
        )}
        <primaryComponents.Input
          name={"email"}
          type={"email"}
          placeholder={"email"}
          onChange={(e) => e.target.value}
        />
        <primaryComponents.Input
          name={"password"}
          type={"password"}
          placeholder={"password"}
          onChange={(e) => e.target.value}
        />
        {isSignUp && (
          <primaryComponents.Input
            name={"password"}
            type={"password"}
            placeholder={"Repeat password"}
            onChange={(e) => e.target.value}
          />
        )}
        {isSignUp ? (
          <primaryComponents.Input type={"submit"} value="Sign Up" />
        ) : (
          <primaryComponents.Input type={"submit"} value="Sign in" />
        )}
        {!isSignUp &&
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
        }
      </form>
      {isSignUp ? (
        <p style={{ color: '#000'}}>
          Already have an account? <span className="auth-switch-in" onClick={switchMode}>Sign in</span>
        </p>
      ) : (
        <p style={{ color: '#000'}}>
          Don't have an account? <span className="auth-sign-up" onClick={switchMode}>Create</span>
        </p>
      )}
    </div>
  );
};

export default Auth;
