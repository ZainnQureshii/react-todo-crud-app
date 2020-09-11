import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {

  state = {
    isEdit: false,
    currId: null,
    title: '',
  }

  deleteTodo = async (id) => {
    try {
      await this.props.deleteTodo(id)
    } catch(e) {
      console.log(e)
    }
  }

  activateEdit = (id) => {
    console.log(id)
    this.setState({
      isEdit: true,
      currId: id
    })
  }

  showTodo = (item, index) => {
    return(
      <tr key={index}>
        <td>{ index + 1 }</td>
        <td>{ item.title }</td>
        <td><button type="button" onClick={() => this.activateEdit(item.id)}>Edit</button></td>
        <td><button type="button" onClick={() => this.deleteTodo(item.id)}>Delete</button></td>
      </tr>
    )
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  editTodo = async (id) => {
    let todoObj = { title: this.state.title }
    if(todoObj.title.trim() !== '') {
      try {
        await this.props.editTodo(id, todoObj);
        this.setState({
          isEdit: false,
          currId: null
        })
      } catch(e) {
        console.log(e)
      }
    }
  }

  render() {
    const todos = this.props.todos; 
    return(
      <div className="todos">
        {
          todos.length > 0 ?
          <table>
            <tbody>
              {
                todos.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {
                        this.state.isEdit ?
                        this.state.currId === item.id ?
                        <tr key={index}>
                          <td></td>
                          <td> <input type="text" name="title" value={this.state.title} onChange={this.changeHandler} placeholder="Enter Title" /></td>
                          <td></td>
                          <td><button type="button" onClick={() => this.editTodo(item.id)}>Submit</button></td>
                        </tr>
                        : <tr style={{display: "none"}}></tr> : <tr style={{display: "none"}}></tr>
                      }
                      {
                        this.state.isEdit ?
                        this.state.currId === item.id ? 
                          <tr style={{display: "none"}}></tr>
                        : this.showTodo(item, index)
                        : this.showTodo(item, index)
                      }
                    </React.Fragment> 
                  )
                })
              }
            </tbody>
          </table>
          : <div className="">No Todo in the list. Please add above.</div>
        }
      </div>
    )
  }
}

export default TodoList;