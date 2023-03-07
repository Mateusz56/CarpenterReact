import MultiselectDropdown from '../MultiselectDropdown'

function GridFilters(props) {
    function selectInput(key, filter) {
        if (!filter) {
            return <td key={key}></td>
        }
        if (filter.type == "TEXT") {
            return <td key={key}><input value={filter.stateValue} onChange={(event) => filter.setStateValue(event.target.value)} /></td>
        }
        else if (filter.type == "MULTIPLE") {
            return <td key={key}><MultiselectDropdown values={filter.values} parentStateValue={filter.stateValue} parentSetStateValue={filter.setStateValue} /></td>
        }
        else if (filter.type == 'RANGE') {
            return (
                <td key={key}>
                    <input type={filter.subtype} className={'Range'} value={filter.stateValue.min} onChange={(event) => filter.setStateValue({ ...filter.stateValue, min: event.target.value })} />
                    {' - '}
                    <input type={filter.subtype} className={'Range'} value={filter.stateValue.max} onChange={(event) => filter.setStateValue({ ...filter.stateValue, max: event.target.value })} />
                </td>
            )
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