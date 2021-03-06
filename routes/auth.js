import { Router } from 'express';

import { getAccessToken } from '../util';

const AuthRoutes = Router();

export const redirectUrl = `${process.env.REDIRECT_URL}client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}`;

export const handleRedirect = (req, res) => {
	const { user } = req.session;
	if (user) res.redirect('/');
	else res.redirect(redirectUrl);
};

export const handleCallback = async (req, res) => {
	const { code } = req.query;
	const { token, refresh_token, expires_in: expires } = await getAccessToken({
		code,
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_CLIENT_SECRET,
	});
	if (token) {
		req.session.user = { token, refresh_token, expires };
	}
	console.log(req.baseUrl)
	res.status(200).redirect(process.env.LOGIN_CALLBACK_REDIRECT_URL);
};

export const validateUserSession = (req, res) => {
	const { user } = req.session;
	if (!user) res.status(401).json({ message: 'Unauthorized!', auth: false });
	else res.status(200).json({ message: 'Authenticated!', auth: true });
};

AuthRoutes.route('/login/github').get(handleRedirect);
AuthRoutes.route('/validateUser').get(validateUserSession);
AuthRoutes.route('/login/github/callback').get(handleCallback);

export default AuthRoutes;
