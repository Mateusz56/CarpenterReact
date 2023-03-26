import { useState, Fragment } from "react";
import { WorkstationStatus, WorkstationStatusDescription, WorkstationType, WorkstationTypeDescription } from "../../Enums";
import { AddOrRemoveFromArray } from "../../Utility";
import TileMultiSelect from "../TileMultiSelect";
import { WorkstationColors, WorkstationsIcons } from "./WorkstationsConfiguration";

function WorkstationFilters(props) {
    const [colors, setColors] = useState([]);
    const [icons, setIcons] = useState([]);

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
                <span>Name: <input></input></span>
                <span>Description: <input></input></span>
                <span>Allow mul. op.: <input type='checkbox'></input></span>
                <span>
                    {'Type: '}
                    <select>
                        <option value=""></option>
                        {Object.values(WorkstationType).map(x => <option key={x} value={x}>{WorkstationTypeDescription[x]}</option>)}
                    </select>
                </span>
                <span>
                    {'Status: '}
                    <select>
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