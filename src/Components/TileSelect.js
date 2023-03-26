function TileSelect(props) {
    let tileClassName = `TileSelect${props.big ? ' Big' : ''}`

    return (
        <div className={'TileSelectContainer'}>
            {props.tiles.map(x => <div className={`${tileClassName}${x.value == props.selectedValue ? ' Selected' : ''}`} style={x.backgroundColor ? { backgroundColor: x.backgroundColor } : {}} onClick={() => props.setValue(x.value)}>{x.content}</div>)}
        </div>
        )
}

export default TileSelect;