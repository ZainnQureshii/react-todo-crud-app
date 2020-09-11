import React, { Component } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import loader from '../assets/images/loader.gif';
import AddTodo from './AddTodo';

class Todos extends Component {

  state = {
    todos: [],
    isLoading: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.getTodos();
    }, 500)
  }

  getTodos = async () => {
    try {
      let todos = await axios.get('http://localhost:3001/todos');
      console.log()
      this.setState({
        todos: todos.data,
        isLoading: false
      })
    } catch(e) {
      console.log(e)
    }
  }

  addTodo = async (todoObj) => {
    try {
      let addTodo = await axios.post('http://localhost:3001/todos', todoObj);
      let todos = this.state.todos;
      let newTodo = addTodo.data; 
      todos.push(newTodo);
      this.setState({ todos })
    } catch(e) {
      console.log(e)
    }
  }

  deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      this.getTodos();
    } catch(e) {
      console.log(e)
    }
  }

  editTodo = async (id, todoObj) => {
    try {
      await axios.put(`http://localhost:3001/todos/${id}`, todoObj);
      this.getTodos();
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const todoList =  this.state.isLoading
                      ? <img className="loader" src={loader} alt="loader"></img>
                      : <TodoList 
                          todos={this.state.todos}
                          deleteTodo={this.deleteTodo}
                          editTodo={this.editTodo} />
    
    return (
      <React.Fragment>
        <div className="todo-wrapper">
        <AddTodo addTodo={this.addTodo} />
        { todoList }
        </div>
      </React.Fragment>
    )
  }
}

export default Todos;