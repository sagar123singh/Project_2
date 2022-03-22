const mongoose= require('mongoose')
const validator = require('validator');

const internSchema = new mongoose.Schema({
     name: {
         type:String,
         trim:true,
        required:'intern name is mandatory',
        
    }, 
    email: {
        type:String,
        unique: true,
        lowercase:true,
        trim:true,
        required:'email is required',
        validate:{
            validator: function (email){
                return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
            },message: 'please fill a valid email address', isAsync:false
        }
        },
    mobile:{
        type: Number,
        trim:true,
        unique:true,
        match: [/^[1-9]{1}[0-9]{9}$/,'please fill valid mobile number'],
         minLength:[10,'please provide 10 digit number'],
         maxLength:[10,'please provide 10 digit number']

    },
     collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        trim:true,
        ref: "College",
        required:'college name is required'
     },
      isDeleted: {
          type:Boolean,
           default: false
        }
    }, { timestamps: true })
module.exports = mongoose.model('Intern', internSchema , )