import { useContext, useEffect, useState } from "react";
import ReceivingForm from "./ReceivingForm"
import { Dash, Plus } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import { ProductType } from "../../Enums";
import { fetchPost, fetchPut, useFetchData } from "../../Hooks/useFetchData";
import GridButton from "../Grid/GridButton";
import SelectedRowsContext from "../Grid/SelectedRowsContext";
import { PopupsListContext } from "../PopupsListContext";

function EditReceivingForm(props) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [products] = useFetchData('Product', { ProductTypeList: ProductType.Component })
    const [document] = useFetchData(`ReceivingDocument/${props.documentId}`)
    const [lines, setLines] = useState([]);
    const { removePopup } = useContext(PopupsListContext);

    useEffect(() => {
        setLines(document ? document.lines.map(x => { return { ProductID: x.product.id, Quantity: x.quantity } }) : [])
    }, [document])

    const addRow = () => setLines([...lines, { ProductID: 0, Quantity: 0 }])
    const removeRow = () => {
        setLines(lines.filter((x, i) => !selectedRows.includes(i)))
        setSelectedRows([])
    }

    const changeValue = (line, field, value) => {
        line[field] = value
        setLines([...lines])
    }

    const productDropdown = (line) => <select value={line.ProductID} onChange={(event) => changeValue(line, 'ProductID', event.target.value)}>{products ? [{ id: 0, name: '--' }, ...products.values].map(x => <option value={x.id}>{x.name}</option>) : ''}</select>
    const quantityInput = (line) => <input type={"number"} style={{ width: '100px' }} value={line.Quantity} onChange={(event) => changeValue(line, 'Quantity', event.target.value)} />

    const gridButtons = [
        <GridButton key={0} floatRight={true} position={'header'} disabledCheck={(rows) => rows.length == 0} onClick={removeRow}>{<Dash size={25} />}</GridButton>,
        <GridButton key={1} floatRight={true} position={'header'} onClick={addRow}>{<Plus size={25} />}</GridButton>
    ]

    const rowsData = {
        id: lines.map((x, i) => i),
        data: lines.map(x => [productDropdown(x), quantityInput(x)])
    }

    const submit = () => {
        fetchPut(`ReceivingDocument/${props.documentId}`, {
            productQuantities: lines.map(x => {
                return {
                    productId: x.ProductID,
                    quantity: x.Quantity
                }
            })
        },
            () => {
                props.refreshGrid()
                removePopup(props.id)
            }
        )
    }

    return (
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
            <ReceivingForm id={props.id} gridButtons={gridButtons} refreshGrid={props.refreshGrid} rowsData={rowsData} submit={submit} selectMode={'MULTIPLE'} title={'Edit receiving document'} />
        </SelectedRowsContext.Provider>
    )
}

export default EditReceivingForm