var express = require('express');
var bodyParser = require('body-parser');
var Storage = require('./Storage');

var storage = new Storage();


var jsonParser = bodyParser.json();

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response){
	response.json(storage.items);
})

app.post('/items', jsonParser, function(request, response){
	
	if (!('name' in request.body)){
		response.status(400).send();
	} else {
		var item = storage.add(request.body.name);
		response.status(201).json(item);
	}
})

app.put('/items/:id', jsonParser, function(request, response){
	var item = request.body.name; 
	var itemId = request.params.id;
	
	
	if (storage.items[itemId]){
		var newItem = storage.update(item, itemId);
		response.status(200).json(newItem);
	} else {
		response.status(400).send({message: "the item id doesn't exist"});		
	}
	
})

app.delete('/items/:id', function(request, response){
	itemId = request.params.id;
	
	if (storage.items[itemId]){
		storage.delete(itemId);
		response.status(200).send(); 
	} else {
		response.status(400).send({message: "the item id doesn't exist"});
	}
	
})
app.listen(8080);

module.exports = {server:app, storage:storage};