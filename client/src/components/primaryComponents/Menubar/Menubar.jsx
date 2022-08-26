import "./Menubar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Menubar = () => {
  return (
    <div className="Menubar">
      <div className="Menubar__title">
        <p className="Menubar__name">Share Your Moments</p>
        <FontAwesomeIcon className="Menubar__icon" icon={faCirclePlus} />
      </div>
    </div>
  );
};

export default Menubar;
