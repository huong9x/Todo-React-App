import React, {Component} from 'react';
import                         './App.css';
import Stat               from './Components/StatComponent';
import Todo               from './Components/TodoComponent';
import NewTodoForm        from './Components/NewTodoFormComponent';

class App extends Component{
  state = {
    todos: [
      {name:'Todo 1', done:true},
      {name:'Todo 2', done:false},
      {name:'Todo 3', done:false},

    ]
  }

  addNewTodo(newTodo) {
      this.setState({
      todos:[newTodo, ...this.state.todos]
    })
  }

  countDone() {
    let done = 0;
    this.state.todos.forEach(todo=>{
      if (todo.done) {
        done++;
      }
    })
    return done;
  }

  clearDone(){
    const notFinishedTodo = this.state.todos.filter((todo)=>!todo.done);
    this.setState({
      todos:notFinishedTodo
    })
  }
  handleDoneChange(todoIndex) {
    let updatedTodos = this.state.todos;
    updatedTodos[todoIndex].done = !updatedTodos[todoIndex].done;

    this.setState({
      todos: updatedTodos
    })
  }

  render(){
    const done = this.countDone();
    const totalTodo = this.state.todos.length;


    return (
      <div>

        <div className={'todo-status'}>
          <Stat done={done} total={totalTodo}/>
          <button onClick={()=> this.clearDone()}>clear</button>
        </div>

        <div className={'todo-list'}>
          <ul>
            {
              this.state.todos.map((todo, index)=>(<Todo onDoneChange={()=>{
                this.handleDoneChange(index);
              }} key={index} todo={todo} />))
            }
          </ul>
        </div>
        
        <div className={'new-todo=form'}>
          <NewTodoForm onNewToDo={(todo)=>{
            this.addNewTodo(todo)
          }}/>
        </div>

      </div>
    )
  }
  
}

export default App;
