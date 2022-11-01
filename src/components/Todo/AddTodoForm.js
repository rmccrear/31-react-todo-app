import { Button, Slider } from "@blueprintjs/core";

import { useState } from 'react';
// import {useForm} from '../../hooks';


function AddTodoForm({addItem, defaultValues}) {
  // const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  const localDefaultValues = {
    text: '',
    assignee: '',
    difficulty: 1
  }
  const [values, setValues] = useState({ ...localDefaultValues, ...defaultValues });

  const handleSubmit = (event) => { 
    event.preventDefault();
    addItem(values);
    setValues({ ...localDefaultValues, ...defaultValues });
  }
  
  const handleChange = (event) => { 
    event.preventDefault && event.preventDefault();
    let { name, value } = event.target;
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  }

  return ( 
      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
        <input data-testid="item-details-input" value={values.text} onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
        <input data-testid="assigned-to-input" value={values.assignee} onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
        <Slider data-testid="difficulty-slider" onChange={(value) => handleChange({ target: {name: 'difficulty', value} })} initialValue={values.difficulty} min={1} max={5} name="difficulty" />
        </label>

        <label>
          <Button data-testid="submit-button" type="submit" text="Add Item"/>
        </label>
      </form>

   );
}

export default AddTodoForm;