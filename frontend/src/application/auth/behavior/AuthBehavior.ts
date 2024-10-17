export default interface AuthBehavior {
  execute(): Promise<void>;
}

