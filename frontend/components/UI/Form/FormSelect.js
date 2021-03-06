import React, {useEffect, useMemo, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {dClone, isEmpty} from "../../../lib/utils";

const FormSelect = React.memo((props) => {

    const selectClassName = "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

    const renderOptions = (givenOptions) => {
        if(isEmpty(givenOptions)){
            return null;
        }
        let options = dClone(givenOptions);
        options.unshift({value: '', displayOption: ''});
        if(options[0].hasOwnProperty('value') && options[0].hasOwnProperty('displayOption')){
            return options.map(option => {
                return (<option key={option.value} value={option.value}>{option.displayOption}</option>);
            });
        } else {
            return options.map((option, index) => {
                return (<option key={index}>{option}</option>);
            });
        }
    };

    let getInitialValue = () => {
        if(isEmpty(props.value)){
            return '';
        }
        if(props.value.hasOwnProperty('id')){
            return props.value.id;
        }
        return props.value;
    };

    let [currentValue, setCurrentValue] = useState(getInitialValue);

    let handleOnChange = (e) => {
        setCurrentValue(e.target.value);
        props.updateFormDataState(props.id, e.target.value);
    };

    useEffect( () => {
        updateFormWithNewValue()
    }, [props.value]);

    let updateFormWithNewValue = async () => {
        let initValue = getInitialValue();
        if(initValue === currentValue){
            return;
        }
        await setCurrentValue(initValue);
        if(!isEmpty(initValue)) {
            await props.updateFormDataState(props.id, initValue);
        }
    };

    return (
        <div className={`min-w-full md:min-w-${props.length} mt-4 px-3 mb-6 md:mb-0`} key={`${props.form_id_prefix}_form_div_${props.id}`}>

            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                   htmlFor={props.id}>
                {props.label}
            </label>

            <div className="relative">
                <select
                    className={selectClassName}
                    id={`${props.form_id_prefix}_form_${props.id}`}
                    name={props.id}
                    ref={props.reference}
                    value={currentValue}
                    onChange={handleOnChange}
                >
                    {renderOptions(props.options)}
                </select>

                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FontAwesomeIcon icon={faAngleDown}/>
                </div>
            </div>

            {props.error? <p className="text-red-500 text-xs italic">{props.error.message}</p> : ""}
        </div>
    );
});

FormSelect.propTypes = {
    form_id_prefix: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    reference: PropTypes.any,
    length: PropTypes.string,
    error: PropTypes.any,
    updateFormDataState: PropTypes.func,
    value: PropTypes.any,
};

export default FormSelect