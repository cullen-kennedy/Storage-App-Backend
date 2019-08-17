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
            done();
        })
    })
})

//Add test for containers/:id 
describe('GET categorycontainers', () => {
    it('Should get all containers', (done) => {
        chai.request(server)
        .get('/api/categories/4/containers')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    })
})




//add test for categories/:id/items failure