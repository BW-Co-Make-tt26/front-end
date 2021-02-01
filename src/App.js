import NewIssueForm from "./components/NewIssueForm";
import Login from "./components/Login";
import SignUp from "./components/SignUpForm";
import { Route, Switch } from 'react-router-dom'
import React, {useState} from 'react'
import IssueBoard  from "./components/IssueBoard";
import PrivateRoute from './components/PrivateRoute'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <h1>Co-Make</h1>
      <Route exact path='/' render={(props) => {
            return <Login {...props} setIsLoggedIn={setIsLoggedIn} />
          }} />
      <Route path='/sign-up' component={SignUp} />
      <PrivateRoute exact path='/issue-board' component={IssueBoard} />
      <Route path='/new-issue-form' component={NewIssueForm} />
      
    </div>
  );
}

export default App;
