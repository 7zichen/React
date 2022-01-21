import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './content/Home';
import Homes from './content/Homes'
import Register from './content/register';
import Signin from './content/Signin';
import Detpage from './content/Detpage';
import Comments from './content/Comment';
export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/Register" exact element={<Register/>} />
                    <Route path="/Signin" exact element={<Signin/>} />
                    <Route path="/" exact element={<Home />} />
                    <Route path="/Homes:columnName" exact element={<Homes />} />
                    <Route path="/Detpage:id" exact element={<Detpage />}/>
                    <Route path="/Comments:id" exact element={<Comments />} />
                </Routes>
            </Router>
        </div>
    )
}