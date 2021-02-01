import NewIssueForm from "./components/NewIssueForm";
import Login from "./components/Login";
import SignUp from "./components/SignUpForm";
import { Route, Link, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Co-Make</h1>
      <Route exact path='/' component={Login} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/new-issue-form' component={NewIssueForm} />
      
    </div>
  );
}

export default App;
