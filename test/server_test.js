var app = require('../server');
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var server = app.server;
var storage = app.storage;

describe('shopping list server', () => {
	beforeEach((done) => {
		storage.add("juice");
		storage.add("milk");
		storage.add("chicken");
		done();
	})

	afterEach((done) => {
		for (var key in storage.items) {
			storage.delete(key); 
		}
		storage.count = 0;
		done();
	})

	it('should return items on get', (done) => {
		chai.request(server)
			.get('/items')
			.end((error, response) => {
				expect(response).to.have.status(200);
				expect(Object.keys(response.body)).to.have.length(3);
				expect(response.body[0]).to.deep.equals({name:"juice", id:0});
				expect(response.body[1]).to.deep.equals({name:"milk", id:1});
				expect(response.body[2]).to.deep.equals({name: "chicken", id:2});
				done();

			})
	});

	it('should add items on post', (done) => {
		chai.request(server)
			.post('/items')
			.send({name: 'eggs'})
			.end((error, response) =>{
				expect(response).to.have.status(201);
				expect(response.body).to.deep.equals({name: "eggs", id:3});
				done();
			})
	});

	it('should return an error if the request is bad on post', (done) => {
		chai.request(server)
			.post('/items')
			.end((error, response) => {
				expect(response).to.have.status(400);
				done();
		})
	});

	it('should update items on put', (done) => {
		chai.request(server)
			.put('/items/1')
			.send({name: 'beans'})
			.end((error, response) => {
				expect(response).to.have.status(200);
				expect(response.body).to.deep.equals({name: "beans", id: 1})
				done();
			})
	});

	it('should return an error if the id does not exist on put', (done) =>{ 
		chai.request(server)
			.put('/items/5')
			.end((error, response) => {
				expect(response).to.have.status(400);
				expect(response.body).to.deep.equals({message: "the item id doesn't exist"});
				done();
			})
	});

	it('should remove items on delete', (done) => {
		chai.request(server)
			.delete('/items/1')
			.end((error, response) => {
				expect(response).to.have.status(200);
				chai.request(server)
				.get('/items')
				.end((error, response) => {
					expect(Object.keys(response.body)).to.have.length(2);
					done();
				})
				
			})
	});		


	it('should return an error if the id does not exist on delete', (done) => {
		chai.request(server)
			.delete('/items/5')
			.end((error, response) => {
				expect(response).to.have.status(400);
				expect(response.body).to.deep.equals({message: "the item id doesn't exist"});
				done();
			})
			
}) 
	});
