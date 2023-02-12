import { createContext } from "react";

export const SelectedProductIDContext = createContext({
    selectedProductID: [],
    setSelectedProductID: () => { }
});