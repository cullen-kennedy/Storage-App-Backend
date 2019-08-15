let chai = require('chai');
let chaiHttp = require('chai-http');
import server from '../server'
let should = chai.should();

chai.use(chaiHttp);

describe('/GET categories', () => {
    it('Should get all categories', (done) => {
        chai.request(server)
        .get('/api/categories')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3)
            done();
        })
    })
})

//add test for categories/:id and success and fail


