import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './auth/login/Login';
import Reset from './auth/reset-pasword/Reset';
import Register from './auth/register/Register';
import { DataCentral } from './context/Context';
import Home from './Home/Home';
import Nav from './nav/Nav';
import AddImages from './add-images/AddImages';
import ImageList from './images-list/ImageList';
import ImageDetails from './imageDetails/ImageDetails';
import Edit from './edit/Edit';
import PasswordReset from './auth/password-reset/PasswordReset';
import ProtectedRoute from './ProtectedRoute';




const App = () => {
    const { auth, setAuth, jwt } = useContext(DataCentral)
    
  
    return  (
        <Router>
           { jwt ? <Nav />: null } 
            <Switch>
                <ProtectedRoute path='/home' jwt={jwt} component={Home} />
                {/* <Route path='/home' exact component={Home} /> */}
                <ProtectedRoute path='/list' jwt={jwt} component={ImageList} />
                <ProtectedRoute path='/add-image' jwt={jwt} component={AddImages} />
                <ProtectedRoute path='/image/:id' jwt={jwt} component={ImageDetails} />
                <ProtectedRoute path='/edit-image/:id' jwt={jwt} component={Edit} />
                    <Route path='/' exact component={Login} />
                    <Route path='/reset-password' component={Reset} />
                    <Route path='/new_password/:email/:hash' component={PasswordReset} />
                    <Route path='/register' component={Register} />
                </Switch>
            </Router>
        );
    }

 
export default App;