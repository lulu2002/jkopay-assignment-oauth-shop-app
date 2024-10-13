import './App.css'
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import {LoginPageViewModel} from "./pages/LoginPage/LoginPageViewModel.ts";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CallbackPage from "./pages/CallbackPage/CallbackPage.tsx";
import GoogleToken from "./application/auth/google-token.ts";
import CallbackPageViewModel from "./pages/CallbackPage/CallbackPageViewModel.ts";

function App() {

  const googleToken = new GoogleToken(
    "5495039569-gso04ni4901r5amm4sdtge6nvd4nld40.apps.googleusercontent.com",
    "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",
    "http://localhost:5173/callback"
  );


  return (
    <>
      <Router>
        <div className="App">
          <h1>好酷商城</h1>
          <Routes>
            <Route path="/" element={<LoginPage viewModel={new LoginPageViewModel(googleToken)}/>}/>
            <Route path="/callback" element={<CallbackPage viewModel={new CallbackPageViewModel(googleToken)}/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
