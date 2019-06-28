import React from 'react';

export default class NewTodoForm extends React.Component {
    state = {
      newTodoName : ''
    }
  
    onInputChange(newTodoName) {
      this.setState({
        newTodoName
      })
    }
  
    render() {
      const {onNewToDo} = this.props
      return (
        <div>
          <input type="text" onChange={(even)=>{
            this.onInputChange(even.target.value);
          }} value={this.state.newTodoName}></input>
          &nbsp;
          <input type="submit"
              onClick={
                () => {
                  onNewToDo(
                    {
                      name: this.state.newTodoName,
                      done: false
                    }
                  )
                }
              }
              value='ADD'>            
          </input>
  
        </div>
      )
    }
  }
  