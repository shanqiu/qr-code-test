var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _User = new Schema({ 
    wechat_link : String, 
    ios_link : String, 
    android_link : String
});
// export them 
exports.User = mongoose.model('User', _User);