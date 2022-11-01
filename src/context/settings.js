import { createContext, useState } from "react";

export const SettingsContext = createContext();

const defaultPaginationLength = 5

function SettingsProvider (props) {
  const [paginationLength, setPaginationLength] = useState(defaultPaginationLength);
  const [sort, setSort] = useState('');
  const [displayCompleted, setDisplayCompleted] = useState(false);
  return (
    <SettingsContext.Provider value={ {paginationLength, sort, displayCompleted, setPaginationLength} }>
      { props.children }
    </SettingsContext.Provider>
  );
}

export default SettingsProvider