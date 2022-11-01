import { createContext, useState } from "react";

export const SettingsContext = createContext();

const defaultPaginationLength = 5

function SettingsProvider (props) {
  const [paginationLength, setPaginationLength] = useState(defaultPaginationLength);
  const [sortBy, setSortBy] = useState('NONE');
  const [showCompleted, setShowCompleted] = useState(false);
  return (
    <SettingsContext.Provider value={ {paginationLength, setPaginationLength, setSortBy, sortBy, showCompleted, setShowCompleted} }>
      { props.children }
    </SettingsContext.Provider>
  );
}

export default SettingsProvider