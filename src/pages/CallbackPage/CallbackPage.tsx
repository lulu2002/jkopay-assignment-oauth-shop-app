import CallbackPageViewModel from "./CallbackPageViewModel.ts";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const CallbackPage = ({viewModel}: { viewModel: CallbackPageViewModel }) => {
  const location = useLocation();

  useEffect(() => {
    const code = viewModel.getCodeFromUrl() ?? "";
    viewModel.exchangeCodeForToken(code);
  }, [location]);

  return <div>Processing login...</div>;
}

export default CallbackPage
