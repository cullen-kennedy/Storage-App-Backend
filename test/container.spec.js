let chai = require('chai');
let chaiHttp = require('chai-http');
import server from '../server'
let should = chai.should();

chai.use(chaiHttp);

describe('/GET containers/3', () => {
    it('Should get container with id 3', (done) => {
        chai.request(server)
        .get('/api/containers/3')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('link');
            res.body.should.have.property('date_entered');
            res.body.should.have.property('rel');
            done();
        })
    })
})

describe('/GET containers/a', () => {
    it('Should be a bad request', (done) => {
        chai.request(server)
        .get('/api/containers/a')
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
})

describe('/GET containers/20', () => {
    it('Should be 404 container not found', (done) => {
        chai.request(server)
        .get('/api/containers/20')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        })
    })
})

describe('/GET containersitems/3/items', () => {
    it('Should get container items with id 3', (done) => {
        chai.request(server)
        .get('/api/containers/3/items')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    })
})

describe('/GET containers/a/items', () => {
    it('Should be a bad request', (done) => {
        chai.request(server)
        .get('/api/containers/a/items')
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    })
})

describe('/GET containers/20/items', () => {
    it('Should be 404 container items not found', (done) => {
        chai.request(server)
        .get('/api/containers/20/items')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        })
    })
})

describe('/GET /containers/3/items/1', () => {
    it('Should get item from container', (done) => {
        chai.request(server)
        .get('/api/containers/3/items/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})

