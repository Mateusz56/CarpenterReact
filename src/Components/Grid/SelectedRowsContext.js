import { createContext } from "react";

const SelectedRowsContext = createContext({
    selectedRows: [],
    toggleSelect: (id) => { }
});

export default SelectedRowsContext;