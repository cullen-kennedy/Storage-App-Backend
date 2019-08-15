let chai = require('chai');
let chaiHttp = require('chai-http');
import server from '../server'
let should = chai.should();

chai.use(chaiHttp);

describe('/GET containers', () => {
    it('Should get all containers', (done) => {
        chai.request(server)
        .get('/api/containers')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3)
            done();
        })
    })
})

//Add test for containers/:id 


describe('/GET containeritems', () => {
    it('Should get all items in a specific container', (done) => {
        chai.request(server)
        .get('/api/containers/1/items')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2)
            done()
        })
    })
})

//add test for categories/:id/items failure