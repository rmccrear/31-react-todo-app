import TodoItem from "./TodoItem";      

function TodoList({items, toggleComplete}) {
  return ( 
      <div data-testid='todos-container'>
        {items.map(item => (
            <TodoItem key={ item.id } item={item} toggleComplete={toggleComplete}  />
        ))}
      </div>
   );
}

export default TodoList;

