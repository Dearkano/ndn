'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const SocketSchema = new Schema({
        user1: {
            type: String,
            unique: true,
            required: true,
        },
        user2: {
            type: String,
            unique: true,
            required: true,
        },
        socketId: {
            type: String,
            unique: true,
            required: true,
        }
    });
    return mongoose.model('Socket', SocketSchema);
};