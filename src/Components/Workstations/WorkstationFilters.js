import { useState, Fragment, useEffect } from "react";
import { WorkstationStatus, WorkstationStatusDescription, WorkstationType, WorkstationTypeDescription } from "../../Enums";
import { AddOrRemoveFromArray } from "../../Utility";
import TileMultiSelect from "../TileMultiSelect";
import { WorkstationColors, WorkstationsIcons } from "./WorkstationsConfiguration";

function WorkstationFilters(props) {
    const [colors, setColors] = useState([]);
    const [icons, setIcons] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [allowMultipleOperations, setAllowMultipleOperations] = useState(null);
    const [type, setType] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        props.setFilters({
            WorkstationColors: colors,
            WorkstationIcons: icons,
            NameLike: name,
            DescriptionLike: description,
            AllowMultipleOperations: allowMultipleOperations,
            WorkstationTypes: type,
            WorkstationStatuses: status
        })
    }, [colors, icons, name, description, allowMultipleOperations, type, status])

    const toggleColor = (color) => {
        setColors([...AddOrRemoveFromArray(colors, color)])
    }

    const colorTiles = WorkstationColors.map((x, i) => {
        return {
            value: i,
            backgroundColor: x,
            selected: colors.includes(i),
            onSelect: (value) => toggleColor(value)
        }
    })

    const toggleIcon = (icon) => {
        setIcons([...AddOrRemoveFromArray(icons, icon)])
    }

    const iconTiles = WorkstationsIcons.map((x, i) => {
        return {
            value: i,
            content: x(20),
            selected: icons.includes(i),
            onSelect: (value) => toggleIcon(value)
        }
    })

    return (
        <Fragment>   
            <div className="WorkstationFilters">
                <span>Name: <input onChange={(event) => setName(event.target.value)}></input></span>
                <span>Description: <input onChange={(event) => setDescription(event.target.value)}></input></span>
                <span>Allow mul. op.: <input onChange={(event) => setAllowMultipleOperations(event.target.checked)} type='checkbox'></input></span>
                <span>
                    {'Type: '}
                    <select onChange={(event) => setType(event.target.value)}>
                        <option value=""></option>
                        {Object.values(WorkstationType).map(x => <option key={x} value={x}>{WorkstationTypeDescription[x]}</option>)}
                    </select>
                </span>
                <span>
                    {'Status: '}
                    <select onChange={(event) => setStatus(event.target.value)}>
                        <option value=""></option>
                        {Object.values(WorkstationStatus).map(x => <option key={x} value={x}>{WorkstationStatusDescription[x]}</option>)}
                    </select>
                </span>
            </div>
            <div style={{ marginLeft: '10px' }}>
                <TileMultiSelect tiles={colorTiles.concat(iconTiles)} />
            </div>
        </Fragment>
        )
}

export default WorkstationFilters;