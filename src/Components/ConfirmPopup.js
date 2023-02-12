import { useContext } from 'react';
import { PopupsListContext } from "./PopupsListContext";

function ConfirmPopup(props) {
    const { removePopup } = useContext(PopupsListContext);

    function onConfirm() {
        removePopup(props.id)
        if (props.onConfirm)
            props.onConfirm()
    }

    function onCancel() {
        removePopup(props.id)
        if (props.onCancel)
            props.onCancel()
    }

    return (
        <div>
            {props.text}
            <br/>
            <button className="Button Gray" onClick={onCancel}>Cancel</button>
            <button className="Button" onClick={onConfirm}>Ok</button>
        </div>
        )
}

export default ConfirmPopup;