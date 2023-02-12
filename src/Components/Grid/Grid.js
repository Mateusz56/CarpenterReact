import { useContext, useState } from "react";
import GridBody from "./GridBody";
import GridHeader from "./GridHeader";
import SelectedRowsContext from "./SelectedRowsContext"

function Grid(props) {
    return (
        <div className={"Grid"}>
            <GridHeader buttons={props.buttons.filter(x => x.props.position === 'header')} />
            <GridBody data={props.data} onSelect={props.onSelect} selectMode={props.selectMode} />
            <GridHeader buttons={props.buttons.filter(x => x.props.position === 'footer')} paging={props.paging} />
        </div>
    )
}

export default Grid