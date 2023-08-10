import React from "react";
import secondaryComponents from "../../../components/secondaryComponents";
import './Home.scss';
// import { useLocation } from "react-router-dom";

const Home = ({ currentId, setcurrentid}) => {
  // const location = useLocation();

  // useEffect(() => {
  // }, [location])
  return (
    <div className="home">
        <secondaryComponents.Posts 
            setcurrentid={setcurrentid}
        />
        <secondaryComponents.Form 
            currentId={currentId}
            setcurrentid={setcurrentid}
        />
    </div>
  );
};

export default Home;
