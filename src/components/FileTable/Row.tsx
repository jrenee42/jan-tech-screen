// components/Row.tsx
import React, {useState} from 'react';
import styles from './FileTable.module.scss';
import {FileInfo} from "@/components/main/Main";
import classnames from "classnames";

type RowProps = {
    data: FileInfo;
    onSelect: (index: number, isSelected: boolean) => void;
    index: number;
};

const Row: React.FC<RowProps> = ({data, onSelect, index}) => {

    const [isSelected, setSelected] = useState<boolean>(false);

    // Handler to toggle the checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelected(isChecked);
        onSelect(index, isChecked);
    };

    const checkClass = classnames(styles.cell, styles.columnCheck);
    const nameClass = classnames(styles.cell, styles.columnName);
    const deviceClass = classnames(styles.cell, styles.columnDevice);
    const pathClass = classnames(styles.cell, styles.columnPath);
    const statusClass = classnames(styles.cell, styles.columnStatus);

    const rowClass = classnames(styles.row, isSelected && styles.selectedRow);

    return (
        <div className={rowClass}>
            <div className={checkClass}><input type={'checkbox'}
                                               checked={isSelected}
                                               onChange={handleCheckboxChange}

            /></div>
            <div className={nameClass}>{data.name}</div>
            <div className={deviceClass}>{data.device}</div>
            <div className={pathClass}>{data.path}</div>
            <div className={statusClass}>{data.status}</div>
        </div>
    );
};

export default Row;
