const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
const todoModel = require('./models/todo_model.js');
const { request, response } = require('express');

app.use(bodyParser.json());


app.get('/',(request,response)=>{
    response.send('this is our second api we are building');
});
app.post('/todos',async(request,response)=>{
   const todo = todoModel.create({
    title: request.body.title,
    body:request.body.body,
    status:request.body.status,
    endDate:request.body.endDate,
   });
   try {
       const savetodo = await todo.save();
       response.json({
           data:saveTodo,
           message:"todo successfully created"
       });
   } catch (error) {
       response.json({
           message:error
       });
   }
});
app.get('/todos',async(request,response)=>{
    try {
        const getALLTodos = await todoModel.find();
        response.json({
            message:"operation successful"
        });
    } catch (error) {
       response.json({
           message:error
       });
    }
});
app.get('/todos/:todoId',async(request,response)=>{
    try {
        const getALLTodos = await todoModel.findById({_id:request.params.todoId});
    } catch (error) {
      response.json({
          message:error
      });
    }
});
app.delete('/todos/:todoId',async(request, response)=>{
    try{
    const deleteTodo = await todoModel.findByIdAndDelete({_Id:request.params.todoId});
    response.json({
        data:deleteTodo,
        message:"Todo successfully deleted"
    });
    }
    catch(error){
        response.json({
            
            message:error
        });
    }
});

app.patch('/todo/:todoId',async(request,response)=>{
    try {
       const updateTodo = await todoModel.findOneAndUpdate({_id:request.params.todoid},
            { $set :{
               title:request.body.title,
               status:request.body.status,
               body:request.body.body,
            }}); 
            response.json({
                data:updateTodo,
                message:"Todo successfully updated"
            })  
    } catch (error) {
        response.json({
            message:error
        });
    }
   
});

mongoose.connect(process.env.KE_URL,
()=>console.log('successfully connected'));

app.listen(1000);