import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar'
import './App.css'

import { BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'

import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import Signin from './components/screens/SignIn'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import SubscribedPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import Newpassword from './components/screens/Newpassword'
import VerifyEmail from './components/screens/VerifyEmail'



import { reducer, initialState } from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {

  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })

    }
    else {
      if (!history.location.pathname.startsWith('/reset') && !history.location.pathname.startsWith('/emailverify'))
        history.push('/signin')
    }
  }, [])

  return (
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/signin">
        <Signin />
      </Route>
      
      <Route exact path="/profile">
        
        <Profile />
      </Route>
     

      <Route path="/profile/:userid">
        <UserProfile />
      </Route>

      <Route path="/createpost">
        <CreatePost />
      </Route>

      <Route path="/subscribedposts">
        < SubscribedPosts />
      </Route>

      <Route exact path="/reset">
        < Reset />
      </Route>

      <Route path="/reset/:token">
        < Newpassword />
      </Route>

      <Route path="/emailverify/:token">
        < VerifyEmail />
      </Route>

    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
