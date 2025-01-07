// components/Row.tsx
import React, {useEffect, useState} from 'react';
import styles from './FileTable.module.scss';
import {AVAILABLE_STATUS, FileInfo} from "@/components/main/Main";
import classnames from "classnames";
import StatusIndicator from "@/components/FileTable/Status";
import Checkbox from "@/components/Checkbox/Checkbox";

type RowProps = {
    data: FileInfo;
    onSelect: (index: number, isSelected: boolean) => void;
    index: number;
    autoSelect?: boolean;
};

const Row: React.FC<RowProps> = ({data, onSelect, index, autoSelect}) => {

    const [isSelected, setSelected] = useState<boolean>(false);

    // Handler to toggle the checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelected(isChecked);
        onSelect(index, isChecked);
    };
    const checkBoxDisabled = data.status !== AVAILABLE_STATUS;

    // when autoSelect changes, if the checkbox is enabled and autoselect is actually there
    // (Ie, not undefined) adjust the checkbox and call onSelect.
    // with calling onSelect; the parent doesn't have to do anything else when the 'select all' checkbox
    // is toggled
    useEffect(() => {
        console.log("in use effect; device/autoselect/disabled", data.device, autoSelect, checkBoxDisabled);
        if (!checkBoxDisabled && autoSelect !== undefined) {
            // autoSelect changed; update checkbox:
            setSelected(autoSelect);
            onSelect(index, autoSelect);
        }
    }, [autoSelect]);


    const checkClass = classnames(styles.cell, styles.columnCheck);
    const nameClass = classnames(styles.cell, styles.columnName);
    const deviceClass = classnames(styles.cell, styles.columnDevice);
    const pathClass = classnames(styles.cell, styles.columnPath);
    const statusClass = classnames(styles.cell, styles.columnStatus);

    const rowClass = classnames(styles.row, isSelected && styles.selectedRow);


    const tooltipText = 'Only Available Files can be Downloaded';
    const checkboxComp = <Checkbox checked={isSelected}
                                   onChange={handleCheckboxChange}
                                   tooltip={tooltipText}
                                   disabled={checkBoxDisabled}/>;

    return (
        <div className={rowClass}>
            <div className={checkClass}> {checkboxComp}</div>
            <div className={nameClass}>{data.name}</div>
            <div className={deviceClass}>{data.device}</div>
            <div className={pathClass}>{data.path}</div>
            <div className={statusClass}><StatusIndicator status={data.status}/></div>
        </div>
    );
};

export default Row;
