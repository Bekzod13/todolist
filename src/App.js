import {useState, useEffect} from 'react';
import {FiTrash2} from 'react-icons/fi';
import {HiDocumentAdd} from 'react-icons/hi'

const App=()=> {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    const getTodos = JSON.parse(localStorage.getItem('todos'))

    getTodos && setTodos(getTodos)

  }, [])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])



  const deleteHandler = (id) => {
    if (window.confirm("o'chirilsinmi")) {
      const updatedTodos = todos.filter(item=> item.id !== id);
      setTodos(updatedTodos)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setTodos([...todos, {id: Date.now(),title: todo}])
    console.log(todos);
    setTodo('')
  }

  const clear =() => {
    setTodos([])
  }

  return (
    <div className="container">
      <h1>Create todo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ todo } onChange={ e => setTodo(e.target.value) }  /> 
        <button type='submit'><HiDocumentAdd/> add</button>
      </form>
      <div className="list">
        {
          todos.map((todo)=>(
            <div className="todo" key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={()=>deleteHandler(todo.id)}> <FiTrash2/> delete</button>
            </div>
          ))
        }
      </div>
      <button className='clear' onClick={clear}>clear</button>
    </div>
  );
}

export default App;
