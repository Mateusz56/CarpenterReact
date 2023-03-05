import { useState } from "react";
import { Pencil, Plus } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import { useFetchData } from "../../Hooks/useFetchData";
import Grid from "../Grid/Grid";
import GridButton from "../Grid/GridButton";
import SelectedRowsContext from "../Grid/SelectedRowsContext";
import { useContext } from "react";
import { PopupsListContext } from "../PopupsListContext";
import AddReceivingForm from "./AddReceivingForm";
import EditReceivingForm from "./EditReceivingForm";
import { ReceivingDocumentStatusDescription, ReceivingDocumentStatus } from "../../Enums";
import ReceivingDetails from "./ReceivingDetails";

function ReceivingGrid(props) {
    const pageSize = 15;
    const [page, setPage] = useState(1);

    const [selectedRows, setSelectedRows] = useState([]);

    let fetchDocumentsParams
    const [documents, fetchDocuments] = useFetchData("ReceivingDocument", fetchDocumentsParams)
    const { addPopup } = useContext(PopupsListContext);

    const statusColors = {
        [ReceivingDocumentStatus.New]: 'var(--pastelYellow)',
        [ReceivingDocumentStatus.Accepted]: 'var(--pastelGreen)',
        [ReceivingDocumentStatus.Rejected]: 'var(--pasteLRed)',
        [ReceivingDocumentStatus.Modified]: 'var(--pastelOrange)',
        [ReceivingDocumentStatus.Archived]: 'var(--gray)'
    }

    const openDetails = (id) => {
        addPopup(<ReceivingDetails id={Date.now()} documentId={id}></ReceivingDetails>)
    }

    const gridSettings = {
        columns: {
            ID: {
                displayText: 'ID',
            },
            CreatedDate: {
                displayText: 'Created on',
            },
            ValidationDate: {
                displayText: 'Validated on',
            },
            Status: {
                displayText: 'Status',
            },
            DetailsButton: {
                displayText: '',
                width: '150px'
            }
        },
        rowsData: {
            id: documents ? documents.map(x => x.id) : [],
            data: documents ? documents.map(x => [x.id, new Date(x.createdDate).toLocaleDateString(), x.validationDate ? new Date(x.validationDate).toLocaleDateString() : '', ReceivingDocumentStatusDescription[x.status], <button onClick={() => openDetails(x.id)}>Details</button>]) : [],
            cellsStyle: documents ? documents.map(x => [null, null, null, { backgroundColor: statusColors[x.status] }, null ]) : []
        }
    }

    const buttons = [
        <GridButton key={0} floatRight={false} position={'header'} onClick={() => addPopup(<AddReceivingForm id={Date.now()} refreshGrid={() => fetchDocuments('ReceivingDocument', fetchDocumentsParams)}></AddReceivingForm>)}>{<Plus size={25} />}</GridButton>,
        <GridButton key={1} floatRight={true} position={'header'} disabledCheck={(rows) => rows.length == 0} onClick={() => addPopup(<EditReceivingForm id={Date.now()} documentId={selectedRows[0]} refreshGrid={() => fetchDocuments('ReceivingDocument', fetchDocumentsParams)}></EditReceivingForm>)}>{<Pencil size={16} />}</GridButton>,
    ]

    return (
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
            <div className={"ComponentContainer"} style={props.myStyle}>
                <Grid data={gridSettings} buttons={buttons} singleSelect={true} selectMode={"SINGLE"}></Grid>
            </div>
        </SelectedRowsContext.Provider>
    )
}

export default ReceivingGrid;