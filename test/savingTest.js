const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/users');
const users = require('../models/users');
// Descrbibe Test
describe('Saving Records', function()
{
    //Create test
    it('Saving Records to Database', function(done){
        this.timeout(10000);
        var char = new users({
            ID: '1',
	        FirstName: 'Juan',
	        LastName: 'Herrera', 
	        Email: 'Juan@Herrera.com',
	        Password: '123',
        });
        char.save().then(function(){
            assert(!char.isNew);
            done();
        });
    });
    // Next Test

});