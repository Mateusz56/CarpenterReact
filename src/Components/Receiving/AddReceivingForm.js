import { useContext, useState } from "react";
import { Dash, Plus } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import { ProductType } from "../../Enums";
import { fetchPost, useFetchData } from "../../Hooks/useFetchData";
import Grid from "../Grid/Grid";
import GridButton from "../Grid/GridButton";
import SelectedRowsContext from "../Grid/SelectedRowsContext";
import { PopupsListContext } from "../PopupsListContext";

function AddReceivingForm(props) {
    const { removePopup } = useContext(PopupsListContext);
    const [selectedRows, setSelectedRows] = useState([]);
    const [lines, setLines] = useState([]);
    const [products] = useFetchData('Product', { ProductTypeList: ProductType.Component })

    const changeValue = (line, field, value) => {
        line[field] = value
        setLines([...lines])
    }

    const productDropdown = (line) => <select value={line.ProductID} onChange={(event) => changeValue(line, 'ProductID', event.target.value)}>{products ? [{ id: 0, name: '--' }, ...products.values].map(x => <option value={x.id}>{x.name}</option>) : ''}</select>
    const quantityInput = (line) => <input type={"number"} style={{ width: '100px' }} value={line.Quantity} onChange={(event) => changeValue(line, 'Quantity', event.target.value)} />

    const gridSettings = {
        columns: {
            Product: {
                displayText: 'Product',
            },
            Quantity: {
                displayText: 'Quantity',
            }
        },
        rowsData: {
            id: lines.map((x, i) => i),
            data: lines.map(x => [productDropdown(x), quantityInput(x)])
        }
    }

    const addRow = () => setLines([...lines, { ProductID: 0, Quantity: 0 }])
    const removeRow = () => {
        setLines(lines.filter((x, i) => !selectedRows.includes(i)))
        setSelectedRows([])
    }
    const submit = () => {
        fetchPost('ReceivingDocument', {
            productQuantities: lines.map(x => {
                return {
                    productId: x.ProductID,
                    quantity: x.Quantity
                }
            })},
            () => {
                props.refreshGrid()
                removePopup(props.id)
            }
        )
    }

    const buttons = [
        <GridButton key={0} floatRight={true} position={'header'} disabledCheck={(rows) => rows.length == 0} onClick={removeRow}>{<Dash size={25} />}</GridButton>,
        <GridButton key={1} floatRight={true} position={'header'} onClick={addRow}>{<Plus size={25} />}</GridButton>
    ]

    return (
        <div>
            <div className="Title">Create receiving document</div>
            <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
                <Grid data={gridSettings} buttons={buttons} singleSelect={true} selectMode={"MULTIPLE"} />
            </SelectedRowsContext.Provider>
            <button className="Button Gray" onClick={() => removePopup(props.id)}>Cancel</button>
            <button onClick={submit} className="Button">Submit</button>
        </div>
        )
}

export default AddReceivingForm