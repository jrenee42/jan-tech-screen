import styles from './FileTable.module.scss';
import {AVAILABLE_STATUS, FileInfo} from "@/components/main/Main";
import Row from "@/components/FileTable/Row";
import classnames from "classnames";
import {useState, useEffect} from "react";
import {Download} from 'react-bootstrap-icons';
import MessageDialog from "@/components/MessageDialog/MessageDialog";
import IndeterminateCheckbox from "@/components/Checkbox/IndeterminateCheckbox";

type Props = {
    data: FileInfo[];
};

function createFalseArray(n: number): boolean[] {
    return Array(n).fill(false);
}

const checkAvailability = (dd: FileInfo[]) => dd?.every((d: FileInfo) => d.status === AVAILABLE_STATUS);

const areNoneAvailable = (dd: FileInfo[]) => dd?.every((d: FileInfo) => d.status !== AVAILABLE_STATUS);

const FileTable: React.FC<Props> = ({data}) => {

    const [actualData, setActualData] = useState<FileInfo[]>(data);
    const initSelectedArray = createFalseArray(data.length);
    const [selectedArray, setSelectedArray] = useState<boolean[]>(initSelectedArray);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allAreAvailable, setAllAreAvailable] = useState<boolean>(checkAvailability(data));

    // checkbox in the header:
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [userClickedCheckbox, setUserClickedCheckbox] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // redisplay data when it changes:
    useEffect(() => {
        setActualData(data);
        setSelectedArray(createFalseArray(data.length));
        setAllAreAvailable(checkAvailability(data));
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

    // for the header checkbox
    const handleCheckboxChange = () => {
        setUserClickedCheckbox(true);

        let autoSelect = true;

        if (allAreAvailable) {
            if (indeterminate) {
                setChecked(false);
                setIndeterminate(false);
                autoSelect = false
            } else if (checked) {
                setChecked(false);
                setIndeterminate(false);
                autoSelect = false;
            } else {
                setChecked(true);
                setIndeterminate(false);
            }
        } else {
            if (indeterminate) {
                // uncheck everything
                setChecked(false);
                setIndeterminate(false);
                autoSelect = false;
            } else {
                setChecked(false);
                setIndeterminate(true);
            }
        }
        // now: auto-update all the ones that have available status:
        if (autoSelect) {
            // turn the available ones 'on'
            const newSelectedArray = actualData.map(one => one.status === AVAILABLE_STATUS);
            setSelectedArray(newSelectedArray);
        } else {
            // all go off:
            setSelectedArray(initSelectedArray);
        }

    };

    const adjustHeaderCheckbox = (newArray: boolean[]) => {
        // if array all false; turn off checkbox
        // if array all true, turn on
        // else indeterminate
        if (newArray.every((item: boolean) => !item)) {
            setChecked(false);
            setIndeterminate(false);
        } else if (newArray.every((item: boolean) => item)) {
            setChecked(true);
            setIndeterminate(false);
        } else {
            setChecked(false);
            setIndeterminate(true);
        }
    }

    const onSelect = (index: number, isSelected: boolean) => {
        // Create a shallow copy of the array
        const newArray = [...selectedArray];
        // Update the specific index
        newArray[index] = isSelected;
        setSelectedArray(newArray);
        setUserClickedCheckbox(false);
        adjustHeaderCheckbox(newArray);
    };

    const checkClass = classnames(styles.cell, styles.columnCheck);
    const nameClass = classnames(styles.cell, styles.columnName);
    const deviceClass = classnames(styles.cell, styles.columnDevice);
    const pathClass = classnames(styles.cell, styles.columnPath);
    const selectedLabelClass = classnames(styles.cell, styles.preHeaderCell);
    const downloadBtnClass = classnames(styles.cell, styles.preHeaderCell, styles.downloadButton);
    const checkboxClass = classnames(styles.cell, styles.preHeaderCell);
    const preHeaderRow = classnames(styles.headerRow, styles.preHeaderRow);

    const selectedText = getNumSelected() === 0 ? "None Selected" : `Selected ${getNumSelected()}`;

    const headerStatusClass = classnames(styles.cell, styles.columnStatus, styles.headerStatus);


    const autoSelect = checked || indeterminate;
    let extraRowProps = {};
    if (userClickedCheckbox) {
        extraRowProps = {autoSelect};
    }

    return (
        <div>
            <div className={styles.table}>
                {/* pre-header */}
                <div className={preHeaderRow}>
                    <div className={checkboxClass}>
                        <IndeterminateCheckbox
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={handleCheckboxChange}
                            disabled={areNoneAvailable(actualData)}
                            tooltip='There are no available files to be downloaded'/>
                    </div>
                    <div className={selectedLabelClass} style={{width: '150px'}}>{selectedText}</div>
                    <div className={downloadBtnClass} onClick={openModal}>
                        <Download size={24} className={styles.icon}/>
                        <div>Download Selected</div>
                    </div>
                </div>
                {/* Header */}
                <div className={styles.headerRow}>
                    <div className={checkClass}>&nbsp;</div>
                    <div className={nameClass}>Name</div>
                    <div className={deviceClass}>Device</div>
                    <div className={pathClass}>Path</div>
                    <div className={headerStatusClass}>Status</div>
                </div>

                {/* Rows */}
                {actualData.map((info, index) => (
                    <Row key={info.device} data={info} onSelect={onSelect} index={index} {...extraRowProps}/>
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
