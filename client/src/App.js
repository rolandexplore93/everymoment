import './App.scss'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import Menubar from './components/primaryComponents/Menubar/Menubar';
import { getPost } from './services/actions/posts'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch])

    return (
        <div className='App'>
            <Menubar />
            <Form />
            <Posts />
        </div>
    )
}

export default App