//obsolete due to user Auth

let chai = require('chai');
let chaiHttp = require('chai-http');
import server from '../server'
let should = chai.should();

chai.use(chaiHttp);


describe('/GET items', () => {
    it('Should get all items', (done) => {
        chai.request(server)
        .get('/api/items')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})

describe('/GET items?search=a', () => {
    it('Should search for items', (done) => {
        chai.request(server)
        .get('/api/items?search=a')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})

describe('/GET items?pageNumber=3', () => {
    it('Invalid query parameters', (done) => {
        chai.request(server)
        .get('/api/items?pageNumber=3')
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
})














