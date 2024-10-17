import AuthBehavior from "@src/application/auth/behavior/AuthBehavior";

export default class AuthBehaviorSpy implements AuthBehavior {

  called: boolean = false;

  async execute(): Promise<void> {
    await this.timeout(10);
    this.called = true;
  }

  private timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}