import GridFilters from './GridFilters'
import GridRow from './GridRow'

function GridBody(props) {
    return (
        <div className="GridBody">
            <table>
                <thead>
                    <tr>
                        {props.data.columns.map((x, i) => <th key={i}>{x}</th>)}
                    </tr>
                    {props.data.filters ? <GridFilters filters={props.data.filters} columns={props.data.columns} /> : ''}
                </thead>
                <tbody>
                    {props.data.rows.map(x => <GridRow key={x.id} id={x.id} displayData={x.displayData} onSelect={props.onSelect} selectMode={props.selectMode} />)}
                </tbody>
            </table>
        </div>
        )
}

export default GridBody