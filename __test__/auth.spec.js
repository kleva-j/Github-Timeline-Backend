import sinon from 'sinon';
import axios from 'axios';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

chai.should();
chai.use(chaiHttp);

import { handleRedirect, handleCallback, redirectUrl } from '../routes/auth';
import server from '../index.js';

const result = {
	data: {
		access_token: 'access_token',
		token_type: 'token_type',
		expires_in: 'expires_in',
		refresh_token: 'refresh_token',
		refresh_token_expires_in: 'refresh_token_expires_in',
	},
};

describe('Auth', function () {
	describe('/GET /login/github/callback', () => {
		let sandbox;
		beforeEach(() => (sandbox = sinon.createSandbox()));
		afterEach(() => sandbox.restore());

		it('it should handle the login callback', (done) => {
			const resolved = new Promise((r) => r({ ...result }));
			sandbox.stub(axios, 'post').returns(resolved);
			const req = { query: { code: 'XXXX' }, session: {} };
			const res = { status: () => res, redirect: sinon.spy() };
			handleCallback(req, res).then(() => {
				expect(res.status().redirect.calledOnce).to.be.true;
			});
			done();
		});
	});

	describe('/GET /login/github', () => {
		it('it should make a redirect', (done) => {
			const req = { session: {} };
			const res = { status: () => res, redirect: sinon.spy() };
			handleRedirect(req, res);
			expect(res.redirect.calledOnce).to.be.true;
			expect(res.redirect.calledOnceWith(redirectUrl)).to.be.true;
			done();
		});
	});

	describe('/GET /validateUser', () => {
		it("it should validate a user's session.", (done) => {
			chai
				.request(server)
				.get('/validateUser')
				.end((err, res) => {
					if (err) return done(err);
					res.should.have.status(401);
					res.body.should.be.a('object');
					expect(res.body).to.haveOwnProperty('message');
					expect(res.body).to.haveOwnProperty('auth');
					expect(res.body.message).to.equal('Unauthorized!');
					expect(res.body.auth).to.equal(false);
					done();
				});
		});
	});

	describe('User session', () => {
		let sandbox;
		beforeEach(() => (sandbox = sinon.createSandbox()));
		afterEach(() => sandbox.restore());

		it('it should create a user session after login.', (done) => {
			const resolved = new Promise((r) => r({ ...result }));
			sandbox.stub(axios, 'post').returns(resolved);
			chai
				.request(server)
				.get('/login/github/callback')
				.end((err, res) => {
					if (err) return done(err);
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('object');
					done();
				});
		});
	});
});
