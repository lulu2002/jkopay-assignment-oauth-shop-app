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

  const oauthConfig = new OauthConfig(
    "http://localhost:5174",
    "login",
    "test_client",
    "http://localhost:5173/callback"
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
