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
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3)
            done();
        })
    })
})
