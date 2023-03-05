function GridCell(props) {
    return <td style={props.cellStyle ? props.cellStyle : {}}>{props.value}</td>
}

export default GridCell