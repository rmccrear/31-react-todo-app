import { useContext, useState } from "react";
import { Card, ButtonGroup, Button } from "@blueprintjs/core";
import TodoItem from "./TodoItem";      
import { SettingsContext } from '../../context/settings';

const comparisonFns = {
  'ASSIGNEE': (item1, item2) => item1.assignee.toLowerCase() < item2.assignee.toLowerCase() ? -1: 1,
  'DIFFICULTY': (item1, item2) => item1.difficulty - item2.difficulty,
  'ALPHA': (item1, item2) => item1.text.toLowerCase() < item2.text.toLowerCase() ? -1: 1,

}

function TodoList({items, toggleComplete}) {

  const [idxStart, setIdxStart] = useState(0);
  const { paginationLength, sortBy, showCompleted } = useContext(SettingsContext);
  // const [paginatedItems, setPaginatedItems] = useState([]);

  const processList = (items) => { 
    const filtered = doFilter(items, showCompleted)
    const sorted = doSort(filtered, sortBy);
    const paginated = doPaginate(sorted, idxStart, paginationLength);
    return paginated;
  }
  
  const doPaginate = (items, idxStart, paginationLength) => {
    const idxEnd = idxStart + paginationLength;
    return items.slice(idxStart, idxEnd);
  }

  const doFilter = (items, showCompleted) => { 
    if (showCompleted) {
      return items
    } else { 
      return items.filter((i)=>!i.complete)
    }
  }

  const doSort = (items, sortBy) => {
    if (sortBy === 'ASSIGNEE') {
      const arr = [...items];
      arr.sort(comparisonFns['ASSIGNEE']);
      return arr;
    } else if (sortBy === 'ALPHA') {
      const arr = [...items];
      arr.sort(comparisonFns['ALPHA']);
      return arr;
    } else if (sortBy === 'DIFFICULTY') {
      const arr = [...items];
      arr.sort(comparisonFns['DIFFICULTY']);
      return arr;
    } else { 
      return items;
    }
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
        {processList(items).map(item => (
            <TodoItem key={ item.id } item={item} toggleComplete={toggleComplete}  />
        ))}
      {
        items.length > context.paginationLength ?
        <ButtonGroup>
        <Button onClick={ decrementIdxStart }>&lt;</Button>
        <span className="bp4-button">Showing {idxStart + 1}-{idxStart + context.paginationLength} of {items.length}</span>
        <Button onClick={ incrementIdxStart }>&gt;</Button>
        </ButtonGroup>
        : ''
      }
      </Card>
   );
}

export default TodoList;

