import "./Menubar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/images";
import { Link } from 'react-router-dom';

const Menubar = () => {
  const user = null
  return (
    <div className="Menubar">
      <div className="Menubar__title">
        <Link to={'/'}>
          <p className="Menubar__name">Share Your Moments</p>
        </Link>
        <FontAwesomeIcon className="Menubar__icon" icon={faCirclePlus} />
      </div>
      <div className="Menubar__profile">
      {
        user ? (
          <>
          <div className="Menubar__profile__account">
            <img className="Menubar__profile__avatar" src={images.sparklingTree} alt="avater" />
            <p className="Menubar__profile__user">RollyJS</p>
          </div>
          <button className="Menubar__profile__logout" type="submit">Logout</button>
          </>
        ) : (
          <Link to={'/auth'}>
            <button className="Menubar__profile__signin" type="submit">Sign in</button>
          </Link>
        )
      }

        </div>
    </div>
  );
};

export default Menubar;
