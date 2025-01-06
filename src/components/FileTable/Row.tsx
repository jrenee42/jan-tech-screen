// components/Row.tsx
import React from 'react';
import styles from './FileTable.module.scss';
import {FileInfo} from "@/components/main/Main";
import classnames from "classnames";

type RowProps = {
    data: FileInfo;
};

const Row: React.FC<RowProps> = ({data}) => {

    const checkClass = classnames(styles.cell, styles.columnCheck);
    const nameClass = classnames(styles.cell, styles.columnName);
    const deviceClass = classnames(styles.cell, styles.columnDevice);
    const pathClass = classnames(styles.cell, styles.columnPath);
    const statusClass = classnames(styles.cell, styles.columnStatus);

    return (
        <div className={styles.row}>
            <div className={checkClass}><input type={'checkbox'}/></div>
            <div className={nameClass}>{data.name}</div>
            <div className={deviceClass}>{data.device}</div>
            <div className={pathClass}>{data.path}</div>
            <div className={statusClass}>{data.status}</div>
        </div>
    );
};

export default Row;
