const mongoose = require('mongoose');
//to encrypt password
const crypto = require('crypto');
//to generate unique id
const uuidv1 = require('uuidv1');


const userSchema = new mongoose.Schema({
    first_name : {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    last_name : {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    } ,
    address : {
        type: String,
        required: true,
        maxlength: 100
    },
    encrypted_password: {
        type: String,
        required: true
    },
    pw_mix_string:{
        type:String
    }
},{ timestamps: true }
 
);

// virtual field
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.pw_mix_string = uuidv1();
        this.encrypted_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

    userSchema.methods = {
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.encrypted_password;
        },
    
        encryptPassword: function(password) {
            if (!password) return '';
            try {
                return crypto
                    .createHmac('sha1', this.pw_mix_string)
                    .update(password)
                    .digest('hex');
            } catch (err) {
                return '';
            }
        }
    };
    
    module.exports = mongoose.model('User', userSchema);