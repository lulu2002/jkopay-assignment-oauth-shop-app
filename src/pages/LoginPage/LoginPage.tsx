import {LoginPageViewModel} from "./LoginPageViewModel.ts";

const LoginPage = ({viewModel}: { viewModel: LoginPageViewModel }) => {
  return (
    <>
      <h1>歡迎您，請先登入</h1>
      <button onClick={() => viewModel.googleLogin()}>街口登入</button>
    </>
  )
}

export default LoginPage