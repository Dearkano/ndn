'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ClusterSchema = new Schema({
        cluster: {
            type: String,
            unique: true,
            required: true,
        },
        list: {
            type: Array,
            unique: false,
            required: true
        }
    });
    return mongoose.model('Cluster', ClusterSchema);
};