'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const MessageSchema = new Schema({
        sender: {
            type: String,
            unique: false,
            required: true,
        },
        receiver: {
            type: String,
            unique: false,
            required: true,
        },
        afid: {
            type: String,
            unique: false,
            required: true,
        },
        status: {
            type: String,
            unique: false,
            required: true,
        }
    });
    return mongoose.model('Message', MessageSchema);
};