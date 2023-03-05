import React from "react";
import { useContext, useState } from "react";
import Grid from "../Grid/Grid";
import { PopupsListContext } from "../PopupsListContext";

function ReceivingForm(props) {
    const { removePopup } = useContext(PopupsListContext);

    const gridSettings = {
        columns: {
            Product: {
                displayText: 'Product',
            },
            Quantity: {
                displayText: 'Quantity',
            }
        },
        rowsData: props.rowsData
    }

    return (
        <div>
            <div className="Title">{props.title}</div>
            <Grid data={gridSettings} buttons={props.gridButtons} singleSelect={true} selectMode={props.selectMode} />
            {props.submit ?
                <React.Fragment>
                    <button className="Button Gray" onClick={() => removePopup(props.id)}>Cancel</button>
                    <button onClick={props.submit} className="Button">Submit</button>
                </React.Fragment>
                :
                <button className="Button" onClick={() => removePopup(props.id)}>Close</button>
                }
        </div>
        )
}

export default ReceivingForm