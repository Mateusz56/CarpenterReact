import { useFetchData, fetchDelete } from "../../Hooks/useFetchData";
import { useContext, useEffect, useRef, useState } from "react";
import AddProductForm from "./AddProductForm";
import Grid from "../Grid/Grid";
import GridButton from "../Grid/GridButton";
import { PopupsListContext } from "../PopupsListContext";
import EditProductForm from "./EditProductForm";
import ConfirmPopup from "../ConfirmPopup";
import { SelectedProductIDContext } from "../Contexts";
import { Pencil, Plus, Trash } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import SelectedRowsContext from "../Grid/SelectedRowsContext";

function ProductsGrid(props) {
    const pageSize = 15;
    const [page, setPage] = useState(1);
    const [productTypesFilter, setProductTypesFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [descriptionFilter, setDescriptionFilter] = useState('');
    let setFiltersTimeout = useRef();

    const productFetchParams = {
        PageIndex: page,
        PageSize: pageSize,
        ProductTypeList: productTypesFilter,
        NameLike: nameFilter,
        DescriptionLike: descriptionFilter
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const [products, fetchProducts] = useFetchData(`Product`, productFetchParams);
    const [productTypes] = useFetchData("Product/types")
    const { addPopup } = useContext(PopupsListContext);
    const { selectedProductID, setSelectedProductID } = useContext(SelectedProductIDContext)

    const gridSettings = {
        columns: {
            Name: {
                displayText: 'Name',
                filter: {
                    type: 'TEXT',
                    stateValue: nameFilter,
                    setStateValue: setNameFilter
                }
            },
            Description: {
                displayText: 'Description',
                filter: {
                    type: 'TEXT',
                    stateValue: descriptionFilter,
                    setStateValue: setDescriptionFilter
                }
            },
            Type: {
                displayText: 'Type',
                filter: {
                    type: 'MULTIPLE',
                    values: Object.entries(productTypes ? productTypes : []),
                    stateValue: productTypesFilter,
                    setStateValue: setProductTypesFilter
                },
                width: '130px'
            }
        },
        rowsData: {
            id: products ? products.values.map(x => x.id) : [],
            data: products ? products.values.map(x => [x.name, x.description, x.productTypeName]) : [],
        }
    }

    useEffect(() => {
        fetchProducts(`Product`, productFetchParams)
    }, [page])

    useEffect(() => {
        clearTimeout(setFiltersTimeout.current);
        setFiltersTimeout.current = setTimeout(() => fetchProducts(`Product`, productFetchParams), 500);
    }, [productTypesFilter, nameFilter, descriptionFilter])

    let selectedProduct = products ? products.values.find(x => x.id == selectedProductID) : 0;

    let maxPage = products ? Math.ceil(products.count / pageSize) : 1;
    let paging = {
        page: page,
        setPage: (newPage) => newPage > 0 && newPage <= maxPage && setPage(newPage),
        maxPage: maxPage
    }

    const disableIfNoSelect = (selectedRows) => {
        return selectedRows.length == 0;
    }

    const onDelete = () => {
        fetchDelete(`Product/${selectedProductID}`, null, () => fetchProducts("Product", productFetchParams))
    }

    let buttons = [
        <GridButton key={0} className="Gray" floatRight={true} position={'footer'} onClick={() => fetchProducts("Product", productFetchParams)}>Refresh</GridButton>,
        <GridButton key={1} floatRight={false} position={'header'} onClick={() => addPopup(<AddProductForm id={Date.now()} successCallback={() => fetchProducts("Product", productFetchParams)} />)}>{<Plus size={25} />}</GridButton>,
        <GridButton key={2} floatRight={false} position={'header'} disabledCheck={disableIfNoSelect} onClick={() => addPopup(<EditProductForm id={Date.now()} product={selectedProduct} successCallback={() => fetchProducts("Product", productFetchParams)} />)}><Pencil size={16} /></GridButton>,
        <GridButton key={3} className="Red" floatRight={true} position={'header'} disabledCheck={disableIfNoSelect} onClick={() => addPopup(<ConfirmPopup id={Date.now()} text={`Do you want to delete product: ${selectedProduct.name}`} onConfirm={onDelete} />)}><Trash size={16}/></GridButton>,
    ]

    return (
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }} >
            <div className={"ComponentContainer"} style={props.myStyle}>
                <Grid data={gridSettings} buttons={buttons} singleSelect={true} onSelect={(selectedRows) => setSelectedProductID(selectedRows.length > 0 ? selectedRows[0] : 0)} paging={paging} selectMode={"SINGLE"}></Grid>
            </div>
        </SelectedRowsContext.Provider>
    )
}

export default ProductsGrid;