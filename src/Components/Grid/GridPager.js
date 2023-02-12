import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import GridButton from "./GridButton";

function GridPager(props) {
    return (
        <div className="Pager">
            <GridButton disabledCheck={() => props.page == 1} onClick={() => props.setPage(1)}><ChevronDoubleLeft /></GridButton>
            <GridButton disabledCheck={() => props.page == 1} onClick={() => props.page > 1 && props.setPage(props.page - 1)}><ChevronLeft /></GridButton>
            <input style={{ float: 'left' }} onChange={event => props.setPage(event.target.value)} value={props.page} />
            <GridButton disabledCheck={() => props.page == props.maxPage} onClick={() => props.setPage(props.page + 1)}><ChevronRight /></GridButton>
            <GridButton disabledCheck={() => props.page == props.maxPage} onClick={() => props.setPage(props.maxPage)}><ChevronDoubleRight /></GridButton>
        </div>
        )
}

export default GridPager;