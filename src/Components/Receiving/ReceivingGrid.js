import { useState } from "react";
import { Plus } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import { useFetchData } from "../../Hooks/useFetchData";
import Grid from "../Grid/Grid";
import GridButton from "../Grid/GridButton";
import SelectedRowsContext from "../Grid/SelectedRowsContext";
import { useContext } from "react";
import { PopupsListContext } from "../PopupsListContext";
import AddReceivingForm from "./AddReceivingForm";

function ReceivingGrid(props) {
    const pageSize = 15;
    const [page, setPage] = useState(1);

    const [selectedRows, setSelectedRows] = useState([]);

    let fetchDocumentsParams
    const [documents, fetchDocuments] = useFetchData("ReceivingDocument", fetchDocumentsParams)
    const { addPopup } = useContext(PopupsListContext);

    const statuses = {
        0: 'New',
        1: 'Accepted',
        2: 'Rejected',
        3: 'Modified',
        4: 'Archived'
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
            }
        },
        rowsData: {
            id: documents ? documents.map(x => x.id) : [],
            data: documents ? documents.map(x => [x.id, new Date(x.createdDate).toLocaleDateString(), x.validationDate ? new Date(x.validationDate).toLocaleDateString() : '', statuses[x.status]]) : [],
        }
    }

    const buttons = [
        <GridButton key={0} floatRight={false} position={'header'} onClick={() => addPopup(<AddReceivingForm id={Date.now()} refreshGrid={() => fetchDocuments('ReceivingDocument', fetchDocumentsParams)}></AddReceivingForm>)}>{<Plus size={25} />}</GridButton>,
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