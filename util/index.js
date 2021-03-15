import axios from 'axios';

const url = `${process.env.ACCESS_TOKEN_URL}`;

export const getAccessToken = async (payload) => {
	try {
		const { data } = await axios.post(
			url,
			{ ...payload },
			{
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'text',
			},
		);
		const params = new URLSearchParams(data);

		return {
			token: params.get('access_token'),
			token_type: params.get('token_type'),
			expires_in: params.get('expires_in'),
			refresh_token: params.get('refresh_token'),
			refresh_token_expires_in: params.get('refresh_token_expires_in'),
		};
	} catch (err) {
		return { error: err.message };
	}
};

export const setQueryParams = (params) => {
	let qp = '?';
	for (const [key, value] of Object.entries(params)) {
		qp = qp + `&${key}=${value}`;
	}
	return qp;
};

export default {
	getAccessToken,
	setQueryParams,
};
