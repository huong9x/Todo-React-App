import React from 'react';

export default class NewTodoForm extends React.Component {
    state = {
      newTodoName : ''
    }
  
    onInputChange(newTodoName) {
      this.setState({
        newTodoName : newTodoName
      })
    }
  
    render() {
      const {onNewToDo} = this.props
      return (
        <div>
          <input type="text" onChange={(even)=>{
            // console.log(even.target.value)
            this.onInputChange(even.target.value);
          }} value={this.state.newTodoName}></input>
  
          <input type="submit" onClick={()=>{
            onNewToDo({
              name:this.state.newTodoName,
              done: false
            })
            this.setState({
              newTodoName: ""
            })
           
          }}></input>
  
        </div>
      )
    }
  }