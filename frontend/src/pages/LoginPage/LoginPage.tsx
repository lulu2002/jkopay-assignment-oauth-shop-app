import {LoginPageViewModel} from "@src/pages/LoginPage/LoginPageViewModel";

const LoginPage = ({viewModel}: { viewModel: LoginPageViewModel }) => {
  return (
    <>
      <h1>歡迎您，請先登入</h1>
      <button onClick={() => viewModel.onLogin("custom")}>街口登入</button>
      <button onClick={() => viewModel.googleOAuth()}>Google 登入</button>
    </>
  )
}

export default LoginPage