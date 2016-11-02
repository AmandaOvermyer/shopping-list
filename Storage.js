'use strict';

class Storage{
	constructor(){
		this.items = {};
		this.count = 0;
	}

	add(name){
		let item = {
			name: name, id: this.count
		};
		this.items[this.count] = item;
		this.count++;
		return item;
	}

	update(name, id){
		this.items[id].name = name;
		return this.items[id];
	}

	delete(id){
		delete this.items[id];
		
	}
}

module.exports = Storage;