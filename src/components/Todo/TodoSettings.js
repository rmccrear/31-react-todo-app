import { useState, useContext  } from 'react';
import {Button, Card, H1, Label, Slider} from "@blueprintjs/core";

import { SettingsContext } from '../../context/settings';


function TodoSettings(props) {
  const {paginationLength, setPaginationLength} = useContext(SettingsContext) //useState(3);

  const onPaginationChange = (val) => { 
    console.log(val);
    setPaginationLength(val)
  }
  return (
  <>
      <H1>Settings</H1>
      <Card>
        <Label>
          Items per page
          <Slider onChange={onPaginationChange} value={paginationLength} min={5} max={20} labelStepSize={5} />
        </Label>
      </Card>
  </>);
}

export default TodoSettings;
