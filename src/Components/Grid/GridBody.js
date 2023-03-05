import GridFilters from './GridFilters'
import GridRow from './GridRow'

function GridBody(props) {
    const columns = Object.values(props.data.columns);

    return (
        <div className="GridBody">
            <table>
                <thead>
                    <tr>
                        {columns.map((x, i) => <th style={x.width ? { width: x.width } : {}} key={i}>{x.displayText}</th>)}
                    </tr>
                    {columns.find(x => x.filter) ? <GridFilters filters={columns.map(x => x.filter)} /> : ''}
                </thead>
                <tbody>
                    {props.data.rowsData.id.map((x, i) => <GridRow key={x} id={x} displayData={props.data.rowsData.data[i]} cellStyle={props.data.rowsData.cellsStyle ? props.data.rowsData.cellsStyle[i] : null} onSelect={props.onSelect} selectMode={props.selectMode} />)}
                </tbody>
            </table>
        </div>
        )
}

export default GridBody