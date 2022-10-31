import { Tag, Button, Card } from "@blueprintjs/core";
import {useState} from 'react';
import './App.scss';

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => {
    setCounter(counter+1);
  }
  return (
    <div className="App">
      <Card>
        <Tag> {counter} </Tag>
        <hr/>
        <Button icon="refresh"  intent="success" text="button content" onClick={incrementCounter} />
      </Card>
    </div>
  );
}

export default App;
