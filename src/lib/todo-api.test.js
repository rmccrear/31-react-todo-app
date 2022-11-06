import axios from 'axios';
import TodoApi from "./todo-api";
import { testTodos } from '../__fixtures__/testTodos';

const { arrayContaining, objectContaining } = expect;

const todoApi = new TodoApi(axios);

describe('TodoApi', () => {
  test('should get a todo', async () => {
    const todo1 = await todoApi.get(1);
    expect(todo1).toEqual(objectContaining(testTodos[0]));
  });

  test('should get todo list', async () => {
    const todo1 = await todoApi.getAll();
    expect(todo1).toEqual(arrayContaining([testTodos[0]]));
  });

  test('should create a todo', async () => {
    const newTodo = {
      text: 'Finish new task',
      assignee: 'Bill',
      complete: false,
      difficulty: 4
    }
    const todoCreated = await todoApi.create(newTodo);
    expect(todoCreated).toEqual(expect.objectContaining({ assignee: 'Bill' }));
  })

  test('should delete a todo', async () => {
    const resp = await todoApi.delete(1);
    expect(resp).toBe(1);
  });

  test('should update a todo', async () => {
    const updatedValue = !testTodos[0].complete;
    const todo1 = await todoApi.update({id: 1, complete: updatedValue});
    expect(todo1).toEqual(expect.objectContaining({ complete: updatedValue }));
  })
  
});