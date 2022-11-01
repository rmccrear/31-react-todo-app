import { createContext, useState } from "react";

export const SettingsContext = createContext();

function SettingsProvider (props) {
  const [paginationLength, setPaginationLength] = useState(3);
  const [sort, setSort] = useState('');
  const [displayCompleted, setDisplayCompleted] = useState(false);
  return (
    <SettingsContext.Provider value={ {paginationLength, sort, displayCompleted} }>
      { props.children }
    </SettingsContext.Provider>
  );
}

export default SettingsProvider