import axios from 'axios';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import server from '../../index.js';

chai.should();
chai.use(chaiHttp);

const job = {
	id: 'a63feabb-6976-4f74-b788-44afa96aed06',
	title: 'Senior Frontend Engineer',
	type: 'Full Time',
	company: 'Quadio',
	description: 'Quadio',
	url: 'https://jobs.github.com/positions/a63feabb-6976-4f74-b788-44afa96aed06',
	location: 'New York',
	created_at: 'Wed Feb 17 20:07:40 UTC 2021',
};

describe('GraphQL', () => {
	let sandbox;
	beforeEach(() => (sandbox = sinon.createSandbox()));
	afterEach(() => sandbox.restore());

	it('it should return fetched jobs', (done) => {
		const resolved = new Promise((r) => r({ data: [job] }));
		sandbox.stub(axios, 'get').returns(resolved);

		chai
			.request(server)
			.post('/graphql')
			.send({
				query:
					'{ jobs { id title type company description url location created_at } }',
			})
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) return done(err);
				res.should.have.status(200);
				res.body.should.be.a('object');
				expect(res.body).to.haveOwnProperty('data');
				expect(res.body['data']).to.haveOwnProperty('jobs');
				expect(res.body['data']['jobs']).to.be.a('array');
				expect(res.body.data.jobs[0].id).to.equal(job.id);
				expect(res.body.data.jobs[0].title).to.equal(job.title);
				expect(res.body.data.jobs[0].type).to.equal(job.type);
				expect(res.body.data.jobs[0].company).to.equal(job.company);
				done();
			});
	});

	it('it should return job with the id of XXXX', (done) => {
		const resolved = new Promise((r) => r({ data: job }));
		sandbox.stub(axios, 'get').returns(resolved);

		chai
			.request(server)
			.get('/graphql')
			.send({
				query:
					'{ job(id: "a63feabb-6976-4f74-b788-44afa96aed06") { id title type company description url location created_at } }',
			})
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) return done(err);
				res.should.have.status(200);
				res.body.should.be.a('object');
				expect(res.body).to.haveOwnProperty('data');
				expect(res.body.data).to.haveOwnProperty('job');
				expect(res.body['data']['job']).to.be.a('object');
				expect(res.body.data.job.id).to.equal(job.id);
				expect(res.body.data.job.title).to.equal(job.title);
				expect(res.body.data.job.type).to.equal(job.type);
				expect(res.body.data.job.company).to.equal(job.company);
				done();
			});
	});
});
