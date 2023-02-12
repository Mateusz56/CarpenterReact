import { useContext, useEffect, useState } from "react";
import { useFetchData, fetchPut, fetchDelete } from "../../Hooks/useFetchData";
import AddComponentForm from "./AddComponentForm";
import { SelectedProductIDContext } from "../Contexts";
import Grid from "../Grid/Grid";
import GridButton from "../Grid/GridButton";
import { PopupsListContext } from "../PopupsListContext";
import { CheckLg, XLg, Plus, PencilSquare, Save, Trash } from 'react-bootstrap-icons';
import ConfirmPopup from "../ConfirmPopup";
import SelectedRowsContext from "../Grid/SelectedRowsContext";

function ComponentsGrid(props) {
    const [editMode, setEditMode] = useState(false);
    const { selectedProductID } = useContext(SelectedProductIDContext)
    const [components, fetchComponents] = useFetchData();
    const [editValues, setEditValues] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const { addPopup } = useContext(PopupsListContext);
    const columns = ['Name', 'Description', 'Quantity', 'Required'];

    useEffect(() => {
        fetchComponents(`ProductComponent?productID=${selectedProductID}`);
        setSelectedRows([]);
    }, [selectedProductID])

    useEffect(() => {
        let values = {}
        if (components)
            components.forEach(x =>
                values[x.id] = {
                    id: x.id,
                    quantity: x.quantity,
                    required: x.required,
                    edited: false
                }
            );

        setEditValues(values);
        if (selectedRows.length > 0)
            setSelectedRows([]);
    }, [components])

    const changeValue = (id, field, value) => {
        setEditValues({
            ...editValues,
            [id]: {
                ...editValues[id],
                [field]: value,
                edited: true
            }
        });
    }

    let changeEditMode = (editModeOn) => {
        if (editModeOn === true) {
            setSelectedRows([])
            setEditMode(true)
        }
        else if (editModeOn === false) {
            setEditMode(false)
        }
    }

    const quantityInput = (id) => (editValues[id] ? <input style={{ width: '50px' }} type={'number'} value={editValues[id].quantity} onChange={(event) => changeValue(id, 'quantity', +event.target.value)}></input> : '')
    const requiredInput = (id) => (editValues[id] ? <input type={'checkbox'} checked={editValues[id].required} onChange={(event => changeValue(id, 'required', event.target.checked))}></input> : '')

    const gridSettings = {
        columns: {
            Name: {
                displayText: 'Name',
            },
            Description: {
                displayText: 'Description',

            },
            Quantity: {
                displayText: 'Quantity',

            },
            Required: {
                displayText: 'Required',

            }
        },
        rowsData: {
            id: components ? components.map(x => x.id) : [],
            data: components ? components.map(x => [x.componentName, x.componentDescription, editMode ? quantityInput(x.id) : x.quantity, editMode ? requiredInput(x.id) : x.required ? <CheckLg /> : <XLg />]) : [],
        }
    }

    const submitEdit = () => {
        fetchPut('ProductComponent',
            Object.values(editValues).filter(x => x.edited),
            () => fetchComponents(`ProductComponent?productID=${selectedProductID}`, () => changeEditMode(false)));
    }

    const onDelete = () => {
        fetchDelete('ProductComponent', selectedRows, () => fetchComponents(`ProductComponent?productID=${selectedProductID}`));
    }

    let buttons = [
        <GridButton
            key={0}
            floatRight={false}
            position={'header'}
            disabledCheck={() => selectedProductID == 0}
            onClick={() => addPopup(<AddComponentForm id={Date.now()} productID={selectedProductID} successCallback={() => fetchComponents(`ProductComponent?productID=${selectedProductID}`)} />)}
        >
            <Plus size={26} />
        </GridButton>,
        <GridButton
            key={1}
            floatRight={true}
            position={'header'}
            disabledCheck={() => !editMode}
            onClick={submitEdit}
        >
            <Save size={16} />
        </GridButton>,
        <GridButton
            key={2}
            floatRight={true}
            position={'header'}
            onClick={() => changeEditMode(!editMode)}
        >
            <PencilSquare size={16} />
        </GridButton>,
        <GridButton
            key={3}
            className="Red"
            floatRight={true}
            position={'header'}
            disabledCheck={(selectedRows) => selectedRows.length == 0}
            onClick={() => addPopup(<ConfirmPopup id={Date.now()} text={`Do you want to delete selected components?`} onConfirm={onDelete} />)}
        >
            <Trash size={16} />
        </GridButton>,
    ]

    return (
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
            <div className={"ComponentContainer"} style={props.myStyle} >
                <Grid data={gridSettings} buttons={buttons} onSelect={(selectedRows) => setSelectedRows(selectedRows)} selectMode={editMode ? "NONE" : "MULTIPLE"}></Grid>
            </div>
        </SelectedRowsContext.Provider>
    )
}

export default ComponentsGrid;