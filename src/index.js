import React, { useContext, useReducer, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const API = 'https://todos-API-nuquyjkqpx.now.sh/todos';

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(endpoint);
    setData(res.data);
  };

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI(API);

  useEffect(
    () => {
      dispatch({
        type: 'GET_TODOS',
        payload: savedTodos
      });
    },
    [savedTodos]
  );

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
