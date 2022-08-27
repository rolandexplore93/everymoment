import React from 'react';
import './App.scss'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import Menubar from './components/primaryComponents/Menubar/Menubar';

const App = () => {
    return (
        <div className='App'>
            <Menubar />
            <Form />
            <Posts />
        </div>
    )
}

export default App