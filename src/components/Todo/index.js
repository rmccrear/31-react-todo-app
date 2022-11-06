import React, { useEffect, useState, useContext } from 'react';
// import { v4 as uuid } from 'uuid';

import TodoNavbar from './Navbar';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import Auth from '../../auth/Auth';

import { LoginContext } from '../../auth/context';


const Todo = () => {

  const { todoApi, user, loggedIn } = useContext(LoginContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  async function addItem(item) {
    // item.id = uuid();
    item.complete = false;
    console.log(item);
    console.log(user);
    const createdItem = await todoApi.create(item);
    //setList([...list, item]);
    setList([...list, createdItem]);
  }

  async function deleteItem(id) {
    await todoApi.delete(id);
    const itemList = await todoApi.getAll();
    setList(itemList);
    //const items = list.filter( item => item.id !== id );
    //setList(items);
  }

  async function toggleComplete(id) {

    const item = list.find((item) => item.id === id);
    await todoApi.update({ ...item, complete: !item.complete });
    const itemList = await todoApi.getAll();
    setList(itemList);
    /*
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);
    */

  }

  useEffect(() => {
    const fetch = async () => {
      const todoList = await todoApi.getAll();
      setList(todoList);
    }
    fetch();
  }, [todoApi]);

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount}`;
  }, [list]);

  return (
    <>
      <TodoNavbar />
      <header>
        <h1>To Do List {loggedIn ? `for ${user.username} ` : ''}
         {incomplete} items pending</h1>
      </header>
      <Auth capability="create">
        <AddTodoForm {...{addItem, defaultValues}} />
      </Auth>
      <Auth capability="read">
        <TodoList items={list} deleteItem={ deleteItem } toggleComplete={toggleComplete} /> 
      </Auth>
    </>
  );
};

export default Todo;