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
            done();
        })
    })
})


describe('/GET containeritems', () => {
    it('Should get all items in a specific container', (done) => {
        chai.request(server)
        .get('/api/containers/4/items')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done()
        })
    })
})
