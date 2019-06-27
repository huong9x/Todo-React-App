import React, {Component} from 'react';
import                         './App.css';
import Stat               from './Components/StatComponent';
import Todo               from './Components/TodoComponent';
import NewTodoForm        from './Components/NewTodoFormComponent'

export default class App extends Component{
  state = {
    todo: [
      {name:'sphinx intern', done:true},
      {name:'firtinga a girl', done:false},
      {name:'fucking a girl', done:false},

    ]
  }

  addNewTodo(newTodo) {
      this.setState({
      todo:[newTodo, ...this.state.todo]
    })
  }

  countDone() {
    let done = 0;
    this.state.todo.forEach(todo=>{
      if (todo.done) {
        done++;
      }
    })
    return done;
  }

  clearDone(){
    const notFinishedTodo = this.state.todo.filter((todo)=>!todo.done);
    this.setState({
      todo:notFinishedTodo
    })
  }
  handleDoneChange(todoIndex) {
    let updatedTodo = this.state.todo;
    updatedTodo[todoIndex].done = !updatedTodo[todoIndex].done;

    this.setState({
      todo: updatedTodo
    })
  }

  render(){
    const done = this.countDone();
    const totalTodo = this.state.todo.length;


    return (
      <div>
        <div className={'todo'}>
          <Stat done={done} total={totalTodo}/>
          <button onClick={()=> this.clearDone()}>clear</button>
        </div>
        <div className={'todo'}>
          <ul>
            {
              this.state.todo.map((todo, index)=>(<Todo onDoneChange={()=>{
                this.handleDoneChange(index);
              }} key={index} todo={todo} />))
            }
          </ul>
        </div>
        <div>
          <NewTodoForm onNewToDo={(todo)=>{
            this.addNewTodo(todo)
          }}/>
        </div>

      </div>
    )
  }
  
}
