export interface OauthLoginRequest {
    code: string;
    redirect_uri: string;
}
export type OauthLoginResponse = {
    success: true;
    message: 'ok';
    token: string;
} | {
    success: false;
    message: 'server_oauth_error';
} | {
    success: false;
    message: 'invalid_redirect_uri';
};
//# sourceMappingURL=oauth-login.d.ts.map