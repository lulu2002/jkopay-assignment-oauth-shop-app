import {LoginPageViewModel} from "@src/pages/LoginPage/LoginPageViewModel";
import AuthBehaviorSpy from "@src/application/auth/behavior/AuthBehaviorSpy";

describe('LoginPageViewModel', () => {

  let viewModel: LoginPageViewModel;
  let spy: AuthBehaviorSpy

  beforeEach(() => {
    spy = new AuthBehaviorSpy();
    viewModel = new LoginPageViewModel(new Map([
      ['google', spy]
    ]));
  });

  it('should fail if provider not implemented', async () => {
    //should window alert
    window.alert = jest.fn();
    await viewModel.onLogin('facebook')

    expect(window.alert).toBeCalledWith('Provider not implemented');
  });

  it('should execute behavior', async () => {
    await viewModel.onLogin('google')
    expect(spy.called).toBeTruthy()
  });

  it('should test', () => {
    expect(true).toBe(true)
  });

});