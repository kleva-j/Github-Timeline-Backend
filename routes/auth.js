import { Router } from 'express';

import { getAccessToken } from '../util';

const AuthRoutes = Router();

export const redirectUrl = `${process.env.REDIRECT_URL}client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}`;

export const handleRedirect = (_req, res) => res.redirect(redirectUrl);
export const handleCallback = async (req, res) => {
	const { code } = req.query;
	const data = await getAccessToken({
		code,
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_CLIENT_SECRET,
	});
	res.status(200).json({ data });
};

AuthRoutes.route('/login/github').get(handleRedirect);
AuthRoutes.route('/login/github/callback').get(handleCallback);

export default AuthRoutes;
