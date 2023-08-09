import "./Menubar.scss";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Menubar = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT'});
    setUser(null);
    googleLogout();
    navigate('/auth');
  }, [dispatch, setUser, navigate])

  useEffect(() => {
    const token = user?.token;

    // if token is expired
    if (token){
      const decodedToken = jwtDecode(token);
      if ((decodedToken.exp * 1000) < new Date().getTime()) logout() 
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, user?.token, logout])

  return (
    <div className="Menubar">
      <div className="Menubar__title">
        <Link to={"/"}>
          <p className="Menubar__name">Share Your Moments</p>
        </Link>
        <FontAwesomeIcon className="Menubar__icon" icon={faCirclePlus} />
      </div>
      <div className="Menubar__profile">
        {user ? (
          <>
            <div className="Menubar__profile__account">
              <img
                className="Menubar__profile__avatar"
                src={images.sparklingTree}
                alt="avater"
              />
              <p className="Menubar__profile__user">{user.data ? user.data.name : user.user.name}</p>
            </div>
            <button className="Menubar__profile__logout" type="submit" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to={"/auth"}>
            <button className="Menubar__profile__signin" type="submit">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menubar;
