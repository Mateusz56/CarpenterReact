import { createContext } from "react";

const PopupsListContext = createContext({
    popupsList: [],
    addPopup: (popup) => { },
    removePopup: (popup) => { }
});

export function AddPopup(popupsList, popup) {
    popupsList.push(popup);
    return [...popupsList];
}

export function RemovePopup(popupsList, key) {
    const index = popupsList.findIndex(x => x.props.id == key);

    if (index == -1)
        return popupsList;
    else {
        popupsList.splice(index, 1);
        return [...popupsList];
    }
}

export { PopupsListContext };