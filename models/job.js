var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    jobTitle:   {
        type: String,
        required : true
    },
    salary : {
        type: String,
        required: false,
        default: ""
    },


    experience : {
        type: String,
        required: false,
        default:""
    },

    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Job', jobSchema);
