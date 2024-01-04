const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://narottamishra67:2L8CPhISitEUl63e@cluster0.wwhjhpq.mongodb.net/new-year-app");

const todoSchema=mongoose.Schema({
    title: String,
    description : String,
    completed : Boolean
});

const Todo= mongoose.model('Todo',todoSchema);

module.exports = {
    Todo: Todo
}