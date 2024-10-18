import './App.css'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "@src/pages/LoginPage/LoginPage";
import {LoginPageViewModel} from "@src/pages/LoginPage/LoginPageViewModel";
import OauthConfig from "@src/application/auth/OauthConfig";
import AuthBehaviorCustom from "@src/application/auth/behavior/AuthBehaviorCustom";
import RetrieveAuthCodeImpl from "@src/application/auth/code/RetrieveAuthCodeImpl";
import UserProxyAxios from "@src/adapters/auth/UserProxyAxios";
import axios from "axios";
import PrivateRoute from "@src/components/PrivateRoute";
import HomePage from "@src/pages/HomePage/HomePage";

function App() {

  const env = import.meta.env;

  const oauthConfig = new OauthConfig(
    env.VITE_OAUTH_API_HOST,
    env.VITE_OAUTH_API_PATH,
    env.VITE_OAUTH_CLIENT_ID,
    env.VITE_OAUTH_REDIRECT_URI
  )

  const userProxy = new UserProxyAxios(axios.create({baseURL: import.meta.env.VITE_API_URL}));
  const authBehavior = new AuthBehaviorCustom(new RetrieveAuthCodeImpl(oauthConfig), oauthConfig, userProxy);

  return (
    <>
      <Router>
        <div className="App">
          <h1>好酷商城</h1>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace/>}/>
            <Route path="/login" element={<LoginPage viewModel={new LoginPageViewModel(new Map([
              ['custom', authBehavior],
            ]))}/>}/>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage/>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
