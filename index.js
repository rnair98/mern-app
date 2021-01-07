/*jshint esversion: 10 */
//dependency imports
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//relative imports
const Post = require('./models/Post.js');
const { MONGODB } = require('./config.js');

//defining graphql types. ! = 'required'
const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts = [Post]    
    }
`;

const resolvers = {
    Query: {
        async getPosts(){
            //if query fails, server will stop. therefore error-check
            try{
                const posts = await Post.find();
                return posts;
            } catch(err){
                throw new Error(err);
            }

        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB is connected');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });