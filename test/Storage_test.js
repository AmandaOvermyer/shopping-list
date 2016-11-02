'use strict';
var Storage = require('../src/Storage');
var chai = require('chai');
var expect = chai.expect;

describe('Storage class', () => {
  it('adds elements', () => {
    let storage = new Storage(); //Preparation
    let milk = storage.add('Milk'); //Execising step
    let beans = storage.add('Beans');
    
    expect(storage.items).not.to.be.empty;
    expect(milk).to.deep.equals({name: 'Milk', id: 0});
    expect(beans).to.deep.equals({name: 'Beans', id: 1});
  });
  
  it('updated elements', () => {
    let storage = new Storage(); //Preparation
    let milk = storage.add('Milk'); //Execising step

    let newItem = storage.update('Milky', milk.id);
    expect(newItem).to.deep.equals({name: 'Milky', id: milk.id});
  });
  
  it('deletes elements', () => {
    let storage = new Storage();
    let milk = storage.add('milk');
    expect(storage.items).not.to.be.empty;
    storage.delete(milk.id);
    expect(storage.items).to.be.empty;
  });
});