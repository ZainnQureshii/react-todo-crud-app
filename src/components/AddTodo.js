import React, { Component } from 'react';

class AddTodo extends Component {

  state = {
    title: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addTodo = async () => {
    let title = this.state.title;
    if(title.trim() !== '') {
      let todoObj = {
        title: this.state.title
      }
      try {
        await this.props.addTodo(todoObj)
        this.setState({ title: '' })
      } catch(e) {
        console.log(e)
      }
    }
  }

  render() {
    return(
      <div className="add-todo-wrapper">
        <h2>Add Todo</h2>
        <div className="add-todo">
          <input type="text" value={this.state.title} name="title" onChange={this.onChangeHandler} placeholder="Enter Title" />
          <button type="button" onClick={this.addTodo}>Submit</button>
        </div>  
      </div>
    )
  }
}

export default AddTodo