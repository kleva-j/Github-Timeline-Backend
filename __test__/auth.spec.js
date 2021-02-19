import sinon from 'sinon';
import { expect } from 'chai';

import { handleRedirect, handleCallback, redirectUrl } from '../routes/auth';
import Util from '../util';

const result = {
	access_token: 'access_token',
	token_type: 'token_type',
	expires_in: 'expires_in',
	refresh_token: 'refresh_token',
	refresh_token_expires_in: 'refresh_token_expires_in',
};

describe('Auth', function () {
	describe('/GET /login/github', () => {
		let sandbox;
		beforeEach(() => (sandbox = sinon.createSandbox()));
		afterEach(() => sandbox.restore());

		it('it should handle the login callback', (done) => {
			const resolved = new Promise((r) => r({ ...result }));
			sandbox.stub(Util, 'getAccessToken').returns(resolved);
			const req = { query: { code: 'XXXX' } };
			const res = { status: () => res, json: sinon.spy() };
			handleCallback(req, res).then(() => {
				expect(res.status().json.calledOnce).to.be.true;
			});
			done();
		});
	});
	
	describe('/GET /login/github/callback', () => {
		it('it should make a redirect', (done) => {
			const req = {};
			const res = { redirect: sinon.spy() };
			handleRedirect(req, res);
			expect(res.redirect.calledOnce).to.be.true;
			expect(res.redirect.calledOnceWith(redirectUrl)).to.be.true;
			done();
		});
	});
});
