import React from "react";
import secondaryComponents from "../../../components/secondaryComponents";
import './Home.scss';

const Home = ({ currentId, setcurrentid}) => {
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
