export default interface AuthBehavior {
  execute(): Promise<boolean>;
}

