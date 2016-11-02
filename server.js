var express = require('express');
var bodyParser = require('body-parser');
var Storage = require('./Storage');

var storage = new Storage();
storage.add('juice');
storage.add('milk');
storage.add('chicken');

var jsonParser = bodyParser.json();

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response){
	response.json(storage.items);
})

app.post('/items', jsonParser, function(request, response){
	var item = storage.add(request.body.name);
	response.status(201).json(item);
})

app.put('/items/:id', jsonParser, function(request, response){
	var item = request.body.name; 
	var itemId = request.params.id;
	var newItem = storage.update(item, itemId);
	response.status(200).json(newItem);
})

app.delete('/items/:id', function(request, response){
	itemId = request.params.id;
	storage.delete(itemId);
	response.status(200).send(); 
	
	
})
app.listen(8080);