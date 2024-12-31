/*

getAllTodo,
  getById,
  createTodo,
  updateById,
  deleteById,

*/
import path from "path";
import fs from "fs"

import { fileURLToPath } from "url";

// as __dirname is not in type:module , it is in common js , lets re-create for type:module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getAllTodo =(req,res)=>{
    

    const TODO_FILE = path.join(__dirname,"../data/todo.json");

    if(!fs.existsSync(TODO_FILE)){
        fs.writeFileSync(TODO_FILE,JSON.stringify([]));
    }

    const data = fs.readFileSync(TODO_FILE,"utf-8");
    
    return res.status(200).send(data);
    

}

export const getById = (req,res)=>{

   const {id} = req.params;

   const TODO_FILE = path.join(__dirname,"../data/todo.json");

   const todos = JSON.parse(fs.readFileSync(TODO_FILE,"utf-8"));

   
   const todo = todos.find((todo)=>{
    return todo.id === id.toString()
   });
   
   if(!todo){
    return res.status(404).json({
        success:false,
        message:"Todo not found"
    })
   }
   else{

       return res.status(200).json(todo);
   }



}

export const createTodo = (req,res)=>{

    const {title,description} = req.body;

    const TODO_FILE = path.join(__dirname,"../data/todo.json");

    if (!fs.existsSync(TODO_FILE)) {

        fs.writeFileSync(TODO_FILE,JSON.stringify([]));
        
    }

    const newEntry = {
        id: Date.now().toString(),
        title,
        description : description || ''
    }

    const todo = JSON.parse(fs.readFileSync(TODO_FILE,"utf-8"));

    todo.push(newEntry);

   const stringified = JSON.stringify(todo);

   fs.writeFileSync(TODO_FILE,stringified);

   return res.status(200).json({
    success:true,
    message:"Done with creation of Todo"
   })





}
export const updateById = (req,res)=>{
 const {id} = req.params;
 const {title,description} = req.body;
 const TODO_FILE = path.join(__dirname,"../data/todo.json");

 const todos = JSON.parse(fs.readFileSync(TODO_FILE,'utf-8'));

 const todo = todos.find((todo)=>todo.id ===id.toString());

 if(!todo){
    return res.status(404).json({
        success:false,
        message:"Todo not found"
    })
    
 }
 todo.title = title || todo.title;
 todo.description = description || todo.description;

 fs.writeFileSync(TODO_FILE,JSON.stringify(todos));

 return res.status(200).json({
    success:true,
    todo,
    message:"Updated"
 })

} 

export const deleteById = (req,res)=>{
    const {id} = req.params;

    const TODO_FILE = path.join(__dirname,"../data/todo.json");

    const todos = JSON.parse(fs.readFileSync(TODO_FILE,"utf-8"));

    
    const todoIndex = todos.findIndex(todo=>todo.id===id.toString());

    if(todoIndex===-1){
        return res.status(404).json({
            success:false,
            message:"Todo not found to be deleted"
        })
    }

   todos.splice(todoIndex,1);
   fs.writeFileSync(TODO_FILE,JSON.stringify(todos));

   return res.status(200).json({
    success:true,
    message:"Done with deleting"
   })


    
}
