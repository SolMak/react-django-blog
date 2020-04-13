import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SELECTABLE_TABLE_CONSTS} from "../../../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {SortCallbackContext} from "../../Pagination/Paginator";

const CON = SELECTABLE_TABLE_CONSTS;

const SelectableHeaderItem = (props) => {
    const {asc: sortAscCallBack, desc: sortDescCallBack} = useContext(SortCallbackContext);


    let [ sortState, setSortState ] = useState(CON.HEADER_SORT_NORMAL);

    let renderIcon = () => {
        if(!props.isSortableColumn){
            return;
        }
        let icon = faSort;
        if(sortState === CON.HEADER_SORT_ASC){
            icon = faSortUp;
        }
        if(sortState === CON.HEADER_SORT_DESC){
            icon = faSortDown;
        }
        return <FontAwesomeIcon icon={icon} className="ml-1" />
    };

    let onClickHandler = () => {
        if(sortState === CON.HEADER_SORT_ASC){
            sortDescCallBack(props.accessor);
            setSortState(CON.HEADER_SORT_DESC);
        } else {
            sortAscCallBack(props.accessor);
            setSortState(CON.HEADER_SORT_ASC);
        }
    };
    
    return (
        <th scope="col" key={props.accessor} onClick={() => onClickHandler()}>
            {props.label}
            {renderIcon()}
        </th>
    );
};

SelectableHeaderItem.defaultProps = {
    isSortableColumn: CON.HEADER_SORT_NORMAL,
};

SelectableHeaderItem.propTyles = {
    isSortableColumn: PropTypes.bool,
    accessor: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
};

export default SelectableHeaderItem