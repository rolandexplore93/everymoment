import './App.scss'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import Menubar from './components/primaryComponents/Menubar/Menubar';
import Spinner from './components/primaryComponents/Spinner/Spinner';
import { getPost } from './services/actions/posts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPost())
    }, [currentId, dispatch]);

    return (
        <div >
            {
                loader ? (
                <div>
                    <Spinner />
                    { setTimeout(() => {
                        setLoader(false)
                    }, 500) }
                </div>
            ) : (
            <BrowserRouter>
                <div className='App'>
                    <ToastContainer position="top-right"
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
                        {/* <Route to='/signin' element={Menubar}></Route> */}
                    </Routes>
                    <div className='App__partition'>
                        <Posts className="App__partition__posts" setcurrentid={setCurrentId} />
                        <Form className="App__partition__form" currentId={currentId} setcurrentid={setCurrentId} />
                    </div>
                </div>
            </BrowserRouter>
            )}

        </div>
    )
}

export default App