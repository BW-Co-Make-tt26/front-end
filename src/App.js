import NewIssueForm from "./components/NewIssueForm";
import Login from "./components/Login";
import SignUp from "./components/SignUpForm";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, {useState} from 'react'
import IssueBoard  from "./components/IssueBoard";
import PrivateRoute from './components/PrivateRoute';
import MyIssues from './components/MyIssues'
import EditForm from './components/EditForm'
import './App.css'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false)
    window.location.reload()
  }

  return (
    <Router>
      <div className="App">
        <h1>Co-Make</h1>
        <Switch>
          <Route exact path='/' render={(props) => {
                return <Login {...props} setIsLoggedIn={setIsLoggedIn} />
              }} />
          <Route path='/sign-up' component={SignUp} />
          <PrivateRoute exact path='/issue-board' component={IssueBoard} logout={logout} />
          <PrivateRoute path='/new-issue-form' component={NewIssueForm} />
          <PrivateRoute path='/my-issues' component={MyIssues} />
          <PrivateRoute path='/edit-form/:id' component={EditForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
