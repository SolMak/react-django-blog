import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TableRowItem from "../TableRowItem";
import ItemActions from "../ItemActions/ItemActions";
import {DataMutationContext} from "./SelectableTable";

const SelectableTableRow = React.memo((props) => {

    let {updateEditModalState: updateEditModalState, updateDeleteModalState: updateDeleteModalState} = useContext(DataMutationContext);
    let [ isInputSelected, setIsInputSelected ] = useState(false);
    let [ rowObj, setRowObj ] = useState(props.rowObj);

    useEffect(() => {
        setIsInputSelected(props.isRowSelected);
    }, [props.isRowSelected, props.rowObj.id]);

    useEffect(() => {
        setRowObj(props.rowObj);
    },[props.rowObj]);

    let renderItems = (rowObj) => {
        return props.columnData.columns.filter(column => {
            return !column.hideOnDisplay;
        }).map((column, index) => {
           return (
               <TableRowItem
                   key={"column"+index+"-"+rowObj.id}
                   isImage={isImageColumn(index)}
                   isBoolean={isBooleanColumn(index)}
                   isDate={isDateColumn(index)}
                   increase={isIncreaseColumn(index)}
                   decrease={isDecreaseColumn(index)}
                   rowObj={rowObj}
                   column={column}
               />);
        })
    };

    let isImageColumn = (index) => {
        return props.columnData.imageColumns.includes(index);
    };
    let isDateColumn = (index) => {
        return props.columnData.dateColumns.includes(index);
    };
    let isBooleanColumn = (index) => {
        return props.columnData.booleanColumns.includes(index);
    };
    let isIncreaseColumn = (index) => {
        return props.columnData.increaseColumns.includes(index);
    };
    let isDecreaseColumn = (index) => {
        return props.columnData.decreaseColumns.includes(index);
    };

    let renderActions = () => {
        if(props.isActionsRequired) {
            return (
                <td className="table-actions whitespace-no-wrap">
                    <ItemActions
                        object={props.rowObj}
                        onEditClicked={() => updateEditModalState(rowObj)}
                        onDeleteClicked={() => updateDeleteModalState(rowObj)}/>
                </td>
            );
        }
    };

    let onInputChangeHandler = (e) => {
        setIsInputSelected(!isInputSelected);
        props.onInputChanged(e);
    };

    return (
        <tr key={props.rowObj.id} className={`border-solid border-gray-300`}>
            <td key={"input-"+props.rowObj.id}>
                <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id={props.rowObj.id}
                    onChange={(e) => {
                        onInputChangeHandler(e);
                    }}
                    checked={isInputSelected}
                />
            </td>
            {renderItems(props.rowObj)}
            {renderActions()}
        </tr>
    );
});

SelectableTableRow.propTypes = {
    rowObj: PropTypes.object,
    isActionsRequired: PropTypes.bool,
    columnData: PropTypes.object,
    onInputChanged: PropTypes.func,
    isRowSelected: PropTypes.bool,
};

export default SelectableTableRow