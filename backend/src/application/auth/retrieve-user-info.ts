import UserInfo from "@src/application/auth/user-info";

export type RetrieveUserInfoResponse =
  { success: true; user: UserInfo; } |
  { success: false; message: 'invalid_token' | 'server_error' };