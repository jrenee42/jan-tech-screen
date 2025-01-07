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

const checkAvailability = (dd: FileInfo[]) => dd.every((d: FileInfo) => d.status === AVAILABLE_STATUS);

const FileTable: React.FC<Props> = ({data}) => {

    const [actualData, setActualData] = useState<FileInfo[]>(data);
    const initSelectedArray = createFalseArray(data.length);
    const [selectedArray, setSelectedArray] = useState<boolean[]>(initSelectedArray);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allAreAvailble, setAllAreAvailble] = useState<boolean>(checkAvailability(data));

    // checkbox in the header:
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // redisplay data when it changes:
    useEffect(() => {
        setActualData(data);
        setSelectedArray(createFalseArray(data.length));
        setAllAreAvailble(checkAvailability(data));
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if all are available; just toggle it (and propagate to the children!)
        // if all not available:
        // if indeterminate:  then uncheck everything that is checked (and propogate)

        // if not checked; set to indeterminate and propagate to the available ones!
        const justChecked = e.target.checked;
        // console.log("ack ack ack thth", justChecked);

        // when propogating:  add/subtract from the selected array
        // and set a property on the row to 'selected' (true/false) iff the status is available

        // DONE: also:  make the checkboxes be disabled if status is not available, with a tooltip
        // that says why it is unavailable

        // also...use justChecked instead??? determine this TODO

        let autoSelect = true;

        if (allAreAvailble) {
            if (checked) {
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
            console.log("new array???", newSelectedArray);
            setSelectedArray(newSelectedArray);
        } else {
            console.log("all are off :(");
            // all go off:
            setSelectedArray(initSelectedArray);
        }

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
    const selectedLabelClass = classnames(styles.cell, styles.preHeaderCell);
    const downloadBtnClass = classnames(styles.cell, styles.preHeaderCell, styles.downloadButton);
    const checkboxClass = classnames(styles.cell, styles.preHeaderCell, styles.checkBoxControl);
    const preHeaderRow = classnames(styles.headerRow, styles.preHeaderRow);

    const selectedText = getNumSelected() === 0 ? "None Selected" : `Selected ${getNumSelected()}`;

    const headerStatusClass = classnames(styles.cell, styles.columnStatus, styles.headerStatus);


    const autoSelect = checked || indeterminate;

    return (
        <div>
            <div className={styles.table}>
                {/* pre-header */}
                <div className={preHeaderRow}>
                    <div className={checkboxClass}>
                        <IndeterminateCheckbox
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={handleCheckboxChange}/>
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
                    <Row key={info.device} data={info} onSelect={onSelect} index={index} autoSelect={autoSelect}/>
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
