import React, {Component} from 'react';
import                         './App.css';
import Stat               from './Components/StatComponent';
import Todo               from './Components/TodoComponent';
import NewTodoForm        from './Components/NewTodoFormComponent';


class App extends Component {
  state = {
    todos: [],
    loading: true,
    url: 'https://todos.sphinx-demo.com/todos/'
  }

  async addNewTodo(newTodo) {     
      await this.postTodo(newTodo);
      await this.getTodos();
  }

  async postTodo(newTodo) {  

    await fetch(this.state.url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(newTodo), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then(res => res.json());
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

  async deleteTodo(todoId) {
    await fetch(this.state.url + todoId, {
                  method: 'DELETE'
              }).then(res => res.json());
  }
  
  async clearDone() {
    await this.state.todos.filter(async (todo) => todo.done ? await this.deleteTodo(todo.id) : !todo.done);
    await this.getTodos();    
  }

  selectAll(right) {
    const todos = this.state.todos;
    for (let i = 0; i < todos.length; i++) {
      todos[i].done = right;      
    }
    this.setState({
      todos: todos
    })
  }
  async updateTodo(todo) {
    await fetch(this.state.url + todo.id, {
          method: 'PUT', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({done: todo.done}),
      });
  }
  async handleDoneChange(index) {
    let updatedTodo = this.state.todos;
    updatedTodo[index].done = !updatedTodo[index].done;
    await this.updateTodo(updatedTodo[index]);
    await this.getTodos();
  }
  async getTodos() {
    await fetch('https://todos.sphinx-demo.com/todos')
          .then(res => res.json())
          .then((todos) => {
            this.setState({ todos })
          })
  }
  async componentDidMount() {
    await this.getTodos();
  }

  render() {
    const done      = this.countDone();
    const totalTodo = this.state.todos.length;

    return (
      <div>

        <div className={'todo-status'}>
          <Stat done={done} total={totalTodo}/><br/>
          <button onClick={() => this.selectAll(true)}>Select All</button>&nbsp;
          <button onClick={() => this.selectAll(false)}>Unselect All</button>&nbsp;
          <button onClick={()=> this.clearDone()}>Clear Done</button>
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

        <div className={'new-todo-form'}>
          <NewTodoForm onNewToDo={(todo)=>{
            this.addNewTodo(todo)
          }}/>
        </div>

      </div>
    )
  }
  
}

export default App;
