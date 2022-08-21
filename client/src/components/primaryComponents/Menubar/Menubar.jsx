import "./Menubar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Menubar = () => {
  return (
    <div>
      <div>
        <p>Share Your Moments</p>
        <FontAwesomeIcon icon={faCirclePlus} />
      </div>
    </div>
  );
};

export default Menubar;
