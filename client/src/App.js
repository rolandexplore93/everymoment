import "./App.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Menubar from "./components/primaryComponents/Menubar/Menubar";
import Spinner from "./components/primaryComponents/Spinner/Spinner";
import { getPost } from "./services/actions/posts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import pages from "./pages";

const App = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));


  useEffect(() => {
    dispatch(getPost());
  }, [currentId, dispatch])

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
              <Route path="/" exact element={<Navigate to="/posts" />} />
              <Route path="/posts" index element={<pages.Home currentId={currentId} setcurrentid={setCurrentId} />}></Route>
              <Route path="/posts/search?searchQuery" exact element={<pages.Home currentId={currentId} setcurrentid={setCurrentId} />}></Route>
              <Route path="/posts/:id" element={<pages.PostDetails />} />
              <Route path="/auth" element={(!user ? <pages.Auth /> : <Navigate to='/posts' />)}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
