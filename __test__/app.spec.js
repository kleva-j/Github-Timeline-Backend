import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index.js';

chai.should();
chai.use(chaiHttp);

describe('/GET *', () => {
	it('it should GET catch all route', (done) => {
		chai
			.request(server)
			.get('/')
			.end((err, res) => {
				if (err) return done(err);
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.be.a('string');
				res.text.should.be.eql('Welcome to Github Timeline API.');
				done();
			});
	});
});
