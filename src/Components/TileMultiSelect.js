function TileMultiSelect(props) {
    let tileClassName = `TileSelect${props.big ? ' Big' : ''}`

    return (
        <div className={'TileSelectContainer'}>
            {props.tiles.map(x => <div className={`${tileClassName}${x.selected ? ' Selected' : ''}`} style={x.backgroundColor ? { backgroundColor: x.backgroundColor } : {}} onClick={() => x.onSelect(x.value)}>{x.content}</div>)}
        </div>
    )
}

export default TileMultiSelect;