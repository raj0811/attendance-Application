const mongoose =require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    instituteName:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    number:{
        type: Number,
        require: true
    },
    address: {
        locality: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String, default: "India" }, 
      },
    image:{
        type:String
    },
    verified:{
        type:Boolean,
        default: false
    },
    

   },
    {
        timestamps: true
    
});

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

const User=mongoose.model('User',userSchema);
module.exports=User;