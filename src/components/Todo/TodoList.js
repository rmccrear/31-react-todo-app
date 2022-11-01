import { useContext, useState, useEffect } from "react";
import { Card, ButtonGroup, Button } from "@blueprintjs/core";
import TodoItem from "./TodoItem";      
import { SettingsContext } from '../../context/settings';

function TodoList({items, toggleComplete}) {

  const [idxStart, setIdxStart] = useState(0);
  const { paginationLength } = useContext(SettingsContext);
  // const [paginatedItems, setPaginatedItems] = useState([]);
  
  const doPaginate = () => {
    const idxEnd = idxStart + paginationLength;
    return items.slice(idxStart, idxEnd);
  }

  /*
  useEffect(() => {
    setPaginatedItems(doPaginate());
  }, [paginationLength, idxStart]);
  */
  const incrementIdxStart = () => {
    const next = idxStart+paginationLength
    if(next<items.length){
      setIdxStart(next);
    }
  }

  const decrementIdxStart = () => {
    const next = idxStart-paginationLength
    if (next >= 0) {
      setIdxStart(next);
    } else { 
      setIdxStart(0);
    }
  }

  const context = useContext(SettingsContext);
  return ( 
      <Card data-testid='todos-container'>
        <span>{ context.paginationLength } / page</span>
        {doPaginate().map(item => (
            <TodoItem key={ item.id } item={item} toggleComplete={toggleComplete}  />
        ))}
        <ButtonGroup>
        <Button onClick={ decrementIdxStart }>&lt;</Button>
        <Button onClick={ incrementIdxStart }>&gt;</Button>
        </ButtonGroup>
      </Card>
   );
}

export default TodoList;

