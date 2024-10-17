import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "@src/pages/LoginPage/LoginPage";
import {LoginPageViewModel} from "@src/pages/LoginPage/LoginPageViewModel";
import CallbackPage from "@src/pages/CallbackPage/CallbackPage";
import CallbackPageViewModel from "@src/pages/CallbackPage/CallbackPageViewModel";
import GoogleToken from "@src/application/auth/GoogleToken";
import OauthConfig from "@src/application/auth/OauthConfig";
import AuthBehaviorCustom from "@src/application/auth/behavior/AuthBehaviorCustom";
import RetrieveAuthCodeImpl from "@src/application/auth/code/RetrieveAuthCodeImpl";

function App() {

  const googleToken = new GoogleToken(
    "5495039569-gso04ni4901r5amm4sdtge6nvd4nld40.apps.googleusercontent.com",
    "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",
    "http://localhost:5173/callback"
  );

  const oauthConfig = new OauthConfig(
    "http://localhost:5174",
    "login",
    "test_client",
    "http://localhost:5173/callback"
  )

  const authBehavior = new AuthBehaviorCustom(new RetrieveAuthCodeImpl(oauthConfig));

  return (
    <>
      <Router>
        <div className="App">
          <h1>好酷商城</h1>
          <Routes>
            <Route path="/" element={<LoginPage viewModel={new LoginPageViewModel(googleToken, new Map([
              ['custom', authBehavior],
            ]))}/>}/>
            <Route path="/callback" element={<CallbackPage viewModel={new CallbackPageViewModel(googleToken)}/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
