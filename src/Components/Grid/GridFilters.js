import MultiselectDropdown from '../MultiselectDropdown'

function GridFilters(props) {
    function selectInput(key, filter) {
        if (filter.type == "TEXT") {
            return <td key={key}><input value={filter.stateValue} onChange={(event) => filter.setStateValue(event.target.value)}/></td>
        }
        else if (filter.type == "MULTIPLE") {
            return <td key={key}><MultiselectDropdown values={filter.values} parentStateValue={filter.stateValue} parentSetStateValue={filter.setStateValue}/></td>
        }
        else {
            return <td key={key}></td>
        }
    }

    return (
        <tr className="GridFilters">
            {props.filters.map((x, i) => selectInput(i, x))}
        </tr>
    )
}

export default GridFilters