import styles from './FileTable.module.scss';
import {FileInfo} from "@/components/main/Main";
import Row from "@/components/FileTable/Row";
import classnames from "classnames";
import {useState, useEffect} from "react";
import {Download} from 'react-bootstrap-icons';


type Props = {
    data: FileInfo[];
    onSelect: (index: number, isSelected: boolean) => void;
};

function createFalseArray(n: number): boolean[] {
    return Array(n).fill(false);
}


const FileTable: React.FC<Props> = ({data}) => {

    const [actualData, setActualData] = useState<FileInfo[]>(data);
    const initSelectedArray = createFalseArray(data.length);
    const [selectedArray, setSelectedArray] = useState<boolean[]>(initSelectedArray);


    // redisplay data when it changes:
    useEffect(() => {
        setActualData(data);
        setSelectedArray(createFalseArray(actualData.length));
    }, [data]);

    const getNumSelected = () => selectedArray.filter(x => x).length;

    const onSelect = (index: number, isSelected: boolean) => {
        // Create a shallow copy of the array
        const newArray = [...selectedArray];
        // Update the specific index
        newArray[index] = isSelected;
        setSelectedArray(newArray);
    };

    const checkClass = classnames(styles.cell, styles.columnCheck);
    const nameClass = classnames(styles.cell, styles.columnName);
    const deviceClass = classnames(styles.cell, styles.columnDevice);
    const pathClass = classnames(styles.cell, styles.columnPath);
    const statusClass = classnames(styles.cell, styles.columnStatus);
    const preHeaderClass = classnames(styles.cell, styles.preHeaderCell);
    const checkboxClass = classnames(styles.cell, styles.preHeaderCell, styles.checkBoxControl);
    const preHeaderRow = classnames(styles.headerRow, styles.preHeaderRow);

    const selectedText = getNumSelected() === 0 ? "None Selected" : `Selected ${getNumSelected()}`;

    return (
        <div className={styles.table}>
            {/* pre-header */}
            <div className={preHeaderRow}>
                <div className={checkboxClass}><input type={'checkbox'}/></div>
                <div className={preHeaderClass}>{selectedText}</div>
                <div className={preHeaderClass}><Download size={24} className={styles.icon}/>
                    <div>Download Selected</div>
                </div>
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
            {actualData.map((info, index) => (
                <Row key={info.device} data={info} onSelect={onSelect} index={index}/>
            ))}
        </div>
    );
};


export default FileTable;
