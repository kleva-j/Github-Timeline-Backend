import axios from 'axios';
import sinon from 'sinon';
import { expect } from 'chai';

import Util from '../util';

const payload = {
	code: 'XXX',
	client_id: 'client_id',
	client_secret: 'client_secret',
};

const result = {
	data: {
		access_token: 'access_token',
		token_type: 'token_type',
		expires_in: 'expires_in',
		refresh_token: 'refresh_token',
		refresh_token_expires_in: 'refresh_token_expires_in',
	},
};

describe('Get access token', () => {
	let sandbox;
	beforeEach(() => (sandbox = sinon.createSandbox()));
	afterEach(() => sandbox.restore());

	it('it should fetch an access token', (done) => {
		const resolved = new Promise((r) => r({ ...result }));
		sandbox.stub(axios, 'post').returns(resolved);
		Util.getAccessToken(payload).then((res) => {
			expect(res).to.haveOwnProperty('token');
			expect(res).to.haveOwnProperty('token_type');
			expect(res).to.haveOwnProperty('expires_in');
			expect(res).to.haveOwnProperty('refresh_token');
			expect(res).to.haveOwnProperty('refresh_token_expires_in');
		});
		done();
	});
});
