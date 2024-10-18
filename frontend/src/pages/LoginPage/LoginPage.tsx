import {LoginPageViewModel} from "@src/pages/LoginPage/LoginPageViewModel";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const LoginPage = ({viewModel}: { viewModel: LoginPageViewModel }) => {
  const navigate = useNavigate();

  const handleLogin = async (type: string) => {
    const result = await viewModel.onLogin(type)

    if (result)
      navigate('/home')
  }

  return (
    <>
      <Container>
        <h1>歡迎您，請先登入</h1>
        <Button onClick={() => handleLogin("custom")}>街口登入</Button>
      </Container>
    </>
  )
}

export default LoginPage