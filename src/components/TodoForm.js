import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import TodosContext from '../context';

const API = 'https://todos-api-nuquyjkqpx.now.sh/todos';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(
    () => {
      if (currentTodo.text) {
        setTodo(currentTodo.text);
      } else {
        setTodo('');
      }
    },
    [currentTodo.id]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTodo.text) {
      const res = await axios.patch(`${API}/${currentTodo.id}`, {
        text: todo
      });
      dispatch({ type: 'UPDATE_TODO', payload: res.data });
    } else {
      const res = await axios.post(API, {
        id: uuidv4(),
        text: todo,
        complete: false
      });
      dispatch({ type: 'ADD_TODO', payload: res.data });
    }
    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input type="text" className="border-black border-solid border-2" onChange={(e) => setTodo(e.target.value)} value={todo} />
    </form>
  );
}
