import { useContext, useState } from "react";
import ReceivingForm from "./ReceivingForm"
import { Dash, Plus } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import { ProductType } from "../../Enums";
import { fetchPost, useFetchData } from "../../Hooks/useFetchData";
import GridButton from "../Grid/GridButton";
import SelectedRowsContext from "../Grid/SelectedRowsContext";
import { PopupsListContext } from "../PopupsListContext";

function ReceivingDetails(props) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [document] = useFetchData(`ReceivingDocument/${props.documentId}`)
    const lines = document ? document.lines.map(x => { return { Product: x.product.name, Quantity: x.quantity } }) : []

    const rowsData = {
        id: lines.map((x, i) => i),
        data: lines.map(x => [x.Product, x.Quantity])
    }

    return (
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
            <ReceivingForm id={props.id} rowsData={rowsData} selectMode={'NONE'} title={'Receiving document details'} />
        </SelectedRowsContext.Provider>
    )
}

export default ReceivingDetails