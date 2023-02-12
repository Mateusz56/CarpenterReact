import React from 'react';
import GridPager from './GridPager';

function GridHeader(props) {
    return (
        <div className={"Header"}>
            {props.paging ? <GridPager page={props.paging.page} setPage={props.paging.setPage} maxPage={props.paging.maxPage} /> : ''}
            {props.buttons}
        </div>
        );
}

export default GridHeader