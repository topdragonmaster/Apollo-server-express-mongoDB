import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../models/User';
import Todo from '../models/Todo';

const resolvers = {
  Query: {
    users: (parent, args, context) => {
      return new Promise((resolve,reject)=>{
        User.find((err,users)=>{
            if(err) reject(err);
            else resolve(users);
        })
      })
    },
    user: (parent, args, context) => {
      return new Promise((resolve,reject)=>{
        console.log(args.query)
        User.findOne({...args.query}, (err,user)=>{
            console.log(user)
            if(err) reject(err);
            else resolve(user);
        })
      })
    },
    todos: (parent, args, context) => {
      return new Promise((resolve,reject)=>{
        console.log(args.query)
        Todo.find({owner: args.query}, (err,todos)=>{
            console.log(todos)
            if(err) reject(err);
            else resolve(todos);
        })
      })
    },
  },
  Mutation: {
    addTodo: async (parent, args, context) => {
      try {
        const newTodo = new Todo(args.data);
        const todo = await Todo.create(newTodo);
        return todo
      } catch(error) {
        throw new Error(error);
      }
    },

    deleteTodo: async (parent, args, context) => {
      try {
        const existTodo = await Todo.findOne({_id: args.id})
        if(existTodo) {
          await Todo.deleteOne({_id: args.id});
          return existTodo
        }
        return "todo not exist"
      } catch(error) {
        throw new Error(error);
      }
    },

    updateTodoCheck: async (parent, args, context) => {
      try {
        const existTodo = await Todo.findOne({_id: args.id})
        if(existTodo) {
          const updatedTodo = await Todo.findOneAndUpdate({_id: args.id}, {completed: !existTodo.completed}, {new: true});
          console.log(updatedTodo)
          return updatedTodo
        }
        return "todo not exist"
      } catch(error) {
        throw new Error(error);
      }
    },
  }
};


export default resolvers;