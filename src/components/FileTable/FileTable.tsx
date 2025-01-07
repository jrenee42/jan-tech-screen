import styles from './FileTable.module.scss';
import {FileInfo} from "@/components/main/Main";
import Row from "@/components/FileTable/Row";
import classnames from "classnames";
import {useState, useEffect} from "react";

type Props = {
    data: FileInfo[];
};

const FileTable: React.FC<Props> = ({data}) => {

    const [actualData, setActualData] = useState<FileInfo[]>(data);


    // redisplay data when it changes:
    useEffect(() => {
        setActualData(data);
    }, [data]);

    const checkClass = classnames(styles.cell, styles.columnCheck);
    const nameClass = classnames(styles.cell, styles.columnName);
    const deviceClass = classnames(styles.cell, styles.columnDevice);
    const pathClass = classnames(styles.cell, styles.columnPath);
    const statusClass = classnames(styles.cell, styles.columnStatus);
    const preHeaderClass = classnames(styles.cell, styles.preHeaderCell);

    const preHeaderRow = classnames(styles.headerRow, styles.preHeaderRow);

    return (
        <div className={styles.table}>
            {/* pre-header */}
            <div className={preHeaderRow}>
                <div className={preHeaderClass}><input type={'checkbox'}/></div>
                <div className={preHeaderClass}>Selected #</div>
                <div className={preHeaderClass}> Download Selected</div>
            </div>
            {/* Header */}
            <div className={styles.headerRow}>
                <div className={checkClass}>&nbsp;</div>
                <div className={nameClass}>Name</div>
                <div className={deviceClass}>Device</div>
                <div className={pathClass}>Path</div>
                <div className={statusClass}>Status</div>
            </div>

            {/* Rows */}
            {actualData.map((info) => (
                <Row key={info.device} data={info}/>
            ))}
        </div>
    );
};


export default FileTable;
