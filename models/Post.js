/*jshint esversion: 10 */

const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comment:[
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    like:[
        {
            username: String,
            createdAt: String,
        }
    ],
    //optional link to data model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);


