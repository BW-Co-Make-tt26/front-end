import NewIssueForm from "./components/NewIssueForm";
import Login from "./components/Login";
import SignUp from "./components/SignUpForm";

function App() {
  return (
    <div className="App">
      <h1>Co-Make</h1>
      <Login />
      <SignUp />
      <NewIssueForm />
    </div>
  );
}

export default App;
