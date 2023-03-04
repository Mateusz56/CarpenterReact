import { useContext } from "react"
import GridCell from "./GridCell"
import SelectedRowsContext  from "./SelectedRowsContext"

function GridRow(props) {
    const { selectedRows, setSelectedRows } = useContext(SelectedRowsContext)
    const toggleSelectedRow = (id) => {
        if (props.selectMode == "NONE")
            return;

        let selectedRowsCopy = [...selectedRows]
        const index = selectedRowsCopy.indexOf(id)
        if (index == -1 && props.selectMode == "SINGLE")
            selectedRowsCopy = [id]
        else if (index == -1 && props.selectMode == "MULTIPLE")
            selectedRowsCopy.push(id)
        else
            selectedRowsCopy.splice(index, 1)

        setSelectedRows(selectedRowsCopy)
        if (props.onSelect)
            props.onSelect(selectedRowsCopy)
    }

    return (
        <tr className={selectedRows.includes(props.id) ? "Selected" : ""} onClick={(event) => {
            if(!['SELECT', 'INPUT'].includes(event.target.tagName))
                toggleSelectedRow(props.id);
        }}>
            {props.displayData.map((x, i) => <GridCell key={i} value={x} />) }
        </tr>
    )
}

export default GridRow