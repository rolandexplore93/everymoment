import "./App.scss";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import Menubar from "./components/primaryComponents/Menubar/Menubar";
import Spinner from "./components/primaryComponents/Spinner/Spinner";
// import { getPost } from "./services/actions/posts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import pages from "./pages";
import secondaryComponents from "./components/secondaryComponents";

const App = () => {
  // const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user)

  // useEffect(() => {
  //   dispatch(getPost());
  // }, [currentId, dispatch])

  return (
    <div>
      {loader ? (
        <div>
          <Spinner />
          {setTimeout(() => {
            setLoader(false);
          }, 500)}
        </div>
      ) : (
        <BrowserRouter>
          <div className="App">
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Menubar />
            <Routes>
              <Route path="/" exact element={<pages.Home currentId={currentId} setcurrentid={setCurrentId} />} />
              <Route path="/posts" index element={<pages.Home currentId={currentId} setcurrentid={setCurrentId} />}></Route>
              <Route path="/posts/search" index element={<pages.Home currentId={currentId} setcurrentid={setCurrentId} />}></Route>
              <Route path="/posts/:id" element={<secondaryComponents.PostDetails />} ></Route>
              <Route path="/auth" element={(!user && <pages.Auth /> )}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
