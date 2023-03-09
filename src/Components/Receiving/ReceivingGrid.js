import { useEffect, useRef, useState } from "react";
import { Archive, ArrowClockwise, CheckLg, CheckSquare, Pencil, Plus, X, XLg } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import { fetchPatch, fetchPost, useFetchData } from "../../Hooks/useFetchData";
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
    const pageSize = 16;
    const [page, setPage] = useState(1);

    const [selectedRows, setSelectedRows] = useState([]);

    const [idFilter, setIdFilter] = useState({ min: '', max: '' })
    const [createdDateFilter, setCreatedDateFilter] = useState({ min: '', max: '' })
    const [validationDateFilter, setValidationDateFilter] = useState({ min: '', max: '' })
    const [statusListFilter, setStatusListFilter] = useState([])
    let setFiltersTimeout = useRef();

    const validateButtonAvailableStatuses = [ReceivingDocumentStatus.New, ReceivingDocumentStatus.Modified]
    const rejectButtonAvailableStatuses = [ReceivingDocumentStatus.New, ReceivingDocumentStatus.Modified]
    const archiveButtonAvailableStatuses = [ReceivingDocumentStatus.New, ReceivingDocumentStatus.Modified, ReceivingDocumentStatus.Rejected]
    const editButtonAvailableStatuses = [ReceivingDocumentStatus.New, ReceivingDocumentStatus.Modified, ReceivingDocumentStatus.Rejected]

    let fetchDocumentsParams = {
        PageIndex: page,
        PageSize: pageSize,
        IdMin: idFilter.min,
        IdMax: idFilter.max,
        CreatedBefore: createdDateFilter.max,
        CreatedAfter: createdDateFilter.min,
        ValidatedBefore: validationDateFilter.max,
        ValidatedAfter: validationDateFilter.min,
        StatusList: statusListFilter
    }
    const [documentsFetchedObj, fetchDocuments] = useFetchData("ReceivingDocument", fetchDocumentsParams)
    const documents = documentsFetchedObj ? documentsFetchedObj.values : null

    const { addPopup } = useContext(PopupsListContext);

    const statusColors = {
        [ReceivingDocumentStatus.New]: 'var(--pastelYellow)',
        [ReceivingDocumentStatus.Accepted]: 'var(--pastelGreen)',
        [ReceivingDocumentStatus.Rejected]: 'var(--pastelRed)',
        [ReceivingDocumentStatus.Modified]: 'var(--pastelOrange)',
        [ReceivingDocumentStatus.Archived]: 'var(--gray)'
    }

    const refreshDetail = () => fetchDocuments('ReceivingDocument', fetchDocumentsParams)

    useEffect(() => {
        clearTimeout(setFiltersTimeout.current);
        setFiltersTimeout.current = setTimeout(refreshDetail, 500);
    }, [idFilter, createdDateFilter, validationDateFilter, statusListFilter])

    useEffect(() => {
        refreshDetail()
    }, [page])

    const openDetails = (id) => {
        addPopup(<ReceivingDetails id={Date.now()} documentId={id}></ReceivingDetails>)
    }

    const gridSettings = {
        columns: {
            ID: {
                displayText: 'ID',
                filter: {
                    type: 'RANGE',
                    subtype: 'number',
                    stateValue: idFilter,
                    setStateValue: setIdFilter
                },
                width: '10%'
            },
            CreatedDate: {
                displayText: 'Created on',
                filter: {
                    type: 'RANGE',
                    subtype: 'date',
                    stateValue: createdDateFilter,
                    setStateValue: setCreatedDateFilter
                },
                width: '30%'
            },
            ValidationDate: {
                displayText: 'Validated on',
                filter: {
                    type: 'RANGE',
                    subtype: 'date',
                    stateValue: validationDateFilter,
                    setStateValue: setValidationDateFilter
                },
                width: '30%'
            },
            Status: {
                displayText: 'Status',
                filter: {
                    type: 'MULTIPLE',
                    values: Object.values(ReceivingDocumentStatus).map(x => [x, ReceivingDocumentStatusDescription[x]]),
                    stateValue: statusListFilter,
                    setStateValue: setStatusListFilter
                },
                width: '20%'
            },
            DetailsButton: {
                displayText: '',
                width: '10%'
            }
        },
        rowsData: {
            id: documents ? documents.map(x => x.id) : [],
            data: documents ? documents.map(x => [x.id, new Date(x.createdDate).toLocaleDateString(), x.validationDate ? new Date(x.validationDate).toLocaleDateString() : '', ReceivingDocumentStatusDescription[x.status], <button onClick={() => openDetails(x.id)}>Details</button>]) : [],
            cellsStyle: documents ? documents.map(x => [null, null, null, { backgroundColor: statusColors[x.status] }, null ]) : []
        }
    }

    let maxPage = documentsFetchedObj ? Math.ceil(documentsFetchedObj.count / pageSize) : 1;
    let paging = {
        page: page,
        setPage: (newPage) => newPage > 0 && newPage <= maxPage && setPage(newPage),
        maxPage: maxPage
    }

    const noRowSelected = (rows) => rows.length == 0

    const gridButtonDisabled = (rows, availableStatuses) => {
        if (noRowSelected(rows) || !documents)
            return true;

        let document = documents.find(x => x.id == rows[0])
        if (!document)
            console.error(documents, document)

        return !availableStatuses.includes(document.status)
    }

    const validate = (id) => {
        fetchPost(`ReceivingDocument/${id}`, null, refreshDetail)
    }

    const reject = (id) => {
        fetchPatch(`ReceivingDocument/${id}`, null, refreshDetail)
    }

    const archive = (id) => {
        fetchPatch(`ReceivingDocument/archive/${id}`, null, refreshDetail)
    }

    const buttons = [
        <GridButton key={0} floatRight={false} position={'header'} onClick={() => addPopup(<AddReceivingForm id={Date.now()} refreshGrid={refreshDetail}></AddReceivingForm>)}>{<Plus size={25} />}</GridButton>,
        <GridButton key={1} floatRight={true} position={'header'} disabledCheck={(rows) => gridButtonDisabled(rows, editButtonAvailableStatuses)} onClick={() => addPopup(<EditReceivingForm id={Date.now()} documentId={selectedRows[0]} refreshGrid={refreshDetail}></EditReceivingForm>)}>{<Pencil size={16} />}</GridButton>,
        <GridButton className={'Gray'} key={2} floatRight={true} position={'header'} disabledCheck={(rows) => gridButtonDisabled(rows, archiveButtonAvailableStatuses)} onClick={() => archive(selectedRows[0])}><Archive size={16} /></GridButton>,
        <GridButton className={'Red'} key={3} floatRight={true} position={'header'} disabledCheck={(rows) => gridButtonDisabled(rows, rejectButtonAvailableStatuses)} onClick={() => reject(selectedRows[0])}><X size={25} /></GridButton>,
        <GridButton className={'Green'} key={4} floatRight={true} position={'header'} disabledCheck={(rows) => gridButtonDisabled(rows, validateButtonAvailableStatuses)} onClick={() => validate(selectedRows[0])}><CheckLg size={25} /></GridButton>,
        <GridButton key={5} className="Gray" floatRight={true} position={'footer'} onClick={refreshDetail}><ArrowClockwise size={20} /></GridButton>
    ]

    return (
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
            <div className={"ComponentContainer"} style={props.myStyle}>
                <Grid data={gridSettings} buttons={buttons} singleSelect={true} selectMode={"SINGLE"} paging={paging}></Grid>
            </div>
        </SelectedRowsContext.Provider>
    )
}

export default ReceivingGrid;