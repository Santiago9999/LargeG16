const mocha = require('mocha');
const assert = require('assert');
const users = require('../models/users').default;
// Descrbibe Test
describe('Saving Records', function()
{
    //Create test
    it('Saving Records to Database', function(done){
        var char = new users({
            ID: '2',
	        FirstName: 'Joel',
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