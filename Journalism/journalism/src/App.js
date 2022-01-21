import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Content/Homepage'
import SignIn from './SignIn/Sign in'
import AddTo from './Content/AddTo'
import Manage from './Content/Manage'
import UserAdd from './Content/UserAdd'
import Mondify from './Content/Modify';
import Admin from './Content/Admin';
import Query from './Content/Query';
import Jmondify from './Content/Jmodify';
import See from './Content/See';
export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" exact element={<SignIn />} />
                    <Route path="/Homepage" exact element={<Homepage />}>
                        <Route path="AddTo" exact element={<AddTo />} />
                        <Route path="Manage" exact element={<Manage/>} />
                        <Route path="Modify/:id/:name" exact element={<Mondify />} />
                        <Route path="UserAdd" exact element={<UserAdd />}/>
                        <Route path="Query" exact element={<Query />}/>
                        <Route path="Admin" exact element={<Admin />}/>
                        <Route path="Jmondify:id" exact element={<Jmondify />}/>
                        <Route path="See:id" exact element={<See/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}