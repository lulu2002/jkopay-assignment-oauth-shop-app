export default interface RetrieveAuthCode {
  retrieve(): Promise<string>;
}

