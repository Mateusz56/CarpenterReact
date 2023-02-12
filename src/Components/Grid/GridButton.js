import SelectedRowsContext from "./SelectedRowsContext"
import { useContext } from "react"

function GridButton(props) {
    const { selectedRows } = useContext(SelectedRowsContext)

    let float = props.floatRight ? "right" : "left";
    let className = `Button ${props.className ? props.className : ''}`

    return (
        <button className={className} style={{ float: float }} onClick={props.onClick} disabled={props.disabledCheck ? props.disabledCheck(selectedRows) : false}>{props.children}</button>
        )
}

export default GridButton