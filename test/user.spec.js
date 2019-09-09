//Simple confirmation test for user signin, and getting user resources

let chai = require('chai');
let chaiHttp = require('chai-http');
import server from '../server'
let should = chai.should();

chai.use(chaiHttp);


const userCredentials = {
    email: 'cullen@school.com', 
    pass: 'testpass'
  }

var accessToken;

  
  describe('/post users/signin', () => {
    it('Should sign in a user', (done) => {
        chai.request(server)
        .post('/api/users/signin')
        .send(userCredentials)
        .end((err, res) => {
            res.should.have.status(200);
            accessToken = res.body.accessToken
            done();
        })
    })
})

describe('/get /items', () => {
    it('Should fail to get user items', (done) => {
        chai.request(server)
        .get('/api/items')
        .end((err, res) => {
            res.should.have.status(401);
            done();
        })
    })
})

describe('/get /container/1', () => {
    it('Should get user container', (done) => {
        chai.request(server)
        .get('/api/containers/1')
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})

describe('/get /container/1/items/1', () => {
    it('Should get user containeritems', (done) => {
        chai.request(server)
        .get('/api/containers/1/items/1')
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})

describe('/get /containers/1/items', () => {
    it('Should get user containeritems', (done) => {
        chai.request(server)
        .get('/api/containers/1/items')
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})



