import './App.css'
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import {LoginPageViewModel} from "./pages/LoginPage/LoginPageViewModel.ts";

function App() {

  return (
    <>
      <h1>好酷商城</h1>
      <LoginPage viewModel={new LoginPageViewModel()}/>
    </>
  )
}

export default App
