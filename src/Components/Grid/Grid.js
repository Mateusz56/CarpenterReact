import { useContext, useState } from "react";
import GridBody from "./GridBody";
import GridHeader from "./GridHeader";
import SelectedRowsContext from "./SelectedRowsContext"

function Grid(props) {
    const topButtons = props.buttons.filter(x => x.props.position === 'header')
    const bottomButtons = props.buttons.filter(x => x.props.position === 'footer')
    
    return (
        <div className={"Grid"}>
            {topButtons.length > 0 ? <GridHeader buttons={topButtons}/> : ''} 
            <GridBody data={props.data} onSelect={props.onSelect} selectMode={props.selectMode} />
            {bottomButtons.length > 0 || props.paging ? <GridHeader buttons={bottomButtons} paging={props.paging} /> : ''}
        </div>
    )
}

export default Grid