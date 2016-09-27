var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    title: String,
    content: String,
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createDate: Date,
    selection: String // "all", "read", "unread"
});

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;
