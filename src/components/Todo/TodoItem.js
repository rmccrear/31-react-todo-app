import { Card } from "@blueprintjs/core";

function TodoItem({ item, toggleComplete }) {
  return ( 
     <Card key={item.id}>
       <p>{item.text}</p>
       <p><small>Assigned to: {item.assignee}</small></p>
       <p><small>Difficulty: {item.difficulty}</small></p>
       <div data-testid='toggle-complete-button' onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
       <hr />
     </Card>
   );
}

export default TodoItem;