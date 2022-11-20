import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose';

import typeDefs from './schema/typedefs';
import resolvers from './schema/resolvers';
// import context from './schema/context';
import { API_URL, PORT, MONGODB_URI } from './config';


// database connection
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true   
})
  .then(connection => console.log('Successfully connected to MongoDB'))
  .catch(error => console.log(error.message));


const app = express();
app.use(cors());


// apollo server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

server.start().then(res => {
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(`Server is up and running on ${API_URL}`);
  });

 })


