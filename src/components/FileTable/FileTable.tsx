import styles from './FileTable.module.scss';
import {FileInfo} from "@/components/main/Main";
import Row from "@/components/FileTable/Row";
import classnames from "classnames";
import {useState, useEffect} from "react";
import {Download} from 'react-bootstrap-icons';
import MessageDialog from "@/components/MessageDialog/MessageDialog";


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


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // redisplay data when it changes:
    useEffect(() => {
        setActualData(data);
        setSelectedArray(createFalseArray(actualData.length));
    }, [data]);

    const getNumSelected = () => selectedArray.filter(x => x).length;

    const getSelectedItemText = () => {
        const numSelected = getNumSelected();
        if (numSelected === 0) {
            return "Please select at least one file to download and try again";
        }

        const selectedData = actualData.filter((line, index) => selectedArray[index]);

        return selectedData.map((one, index) => (<div className={styles.modalLine} key={index}>
            <div className={styles.col1}> {one.device}</div>
            <div className={styles.col2}> {one.path}</div>
        </div>));

    };


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
    const selectedLabelClass = classnames(styles.cell, styles.preHeaderCell);
    const downloadBtnClass = classnames(styles.cell, styles.preHeaderCell, styles.downloadButton);
    const checkboxClass = classnames(styles.cell, styles.preHeaderCell, styles.checkBoxControl);
    const preHeaderRow = classnames(styles.headerRow, styles.preHeaderRow);

    const selectedText = getNumSelected() === 0 ? "None Selected" : `Selected ${getNumSelected()}`;

    const maybeShowDownloadMessage = () => {
        // todo: only show if something is selected
        // better todo: show a message saying something has to be selected in order to download anything.
        openModal();
    };

    return (
        <div>
            <div className={styles.table}>
                {/* pre-header */}
                <div className={preHeaderRow}>
                    <div className={checkboxClass}><input type={'checkbox'}/></div>
                    <div className={selectedLabelClass} style={{width: '150px'}}>{selectedText}</div>
                    <div className={downloadBtnClass} onClick={maybeShowDownloadMessage}><Download size={24}
                                                                                                   className={styles.icon}/>
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
            <div>
                <MessageDialog isOpen={isModalOpen} onClose={closeModal}>
                    <h2>Selected Files To Be Downloaded</h2>

                    <div className={styles.modalTable}>
                        {getSelectedItemText()}
                    </div>
                </MessageDialog>
            </div>

        </div>
    );
};


export default FileTable;
