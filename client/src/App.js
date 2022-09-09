import './App.scss'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import Menubar from './components/primaryComponents/Menubar/Menubar';
import Spinner from './components/primaryComponents/Spinner/Spinner';
import { getPost } from './services/actions/posts';

const App = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch]);

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
                <div className='App'>
                    <Menubar />
                    <div className='App__partition'>
                        <Posts className="App__partition__posts" setCurrentId={setCurrentId} />
                        <Form className="App__partition__form" currentId={currentId} setCurrentId={setCurrentId} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default App