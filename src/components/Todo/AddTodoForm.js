import {useForm} from '../../hooks';


function AddTodoForm({addItem, defaultValues}) {
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  return ( 
      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input data-testid="item-details-input" onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input data-testid="assigned-to-input" onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input data-testid="difficulty-slider" onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button data-testid="submit-button" type="submit">Add Item</button>
        </label>
      </form>

   );
}

export default AddTodoForm;