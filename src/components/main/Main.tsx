'use client';

import {useState} from "react";
import styles from './main.module.scss';
import FileTable from "@/components/FileTable/FileTable";

const initText = '[{name: \'smss.exe\', device: \'Mario\', path: \'\\\\Device\\\\HarddiskVolume2\\\\Windows\\\\System32\\\\smss.exe\', status: \'scheduled\'}, {name: \'netsh.exe\', device: \'Luigi\', path: \'\\\\Device\\\\HarddiskVolume2\\\\Windows\\\\System32\\\\netsh.exe\', status: \'available\'}, {name: \'uxtheme.dll\', device: \'Peach\', path: \'\\\\Device\\\\HarddiskVolume1\\\\Windows\\\\System32\\\\uxtheme.dll\', status: \'available\'}, {name: \'aries.sys\', device: \'Daisy\', path: \'\\\\Device\\\\HarddiskVolume1\\\\Windows\\\\System32\\\\aries.sys\', status: \'scheduled\'}, {name: \'cryptbase.dll\', device: \'Yoshi\', path: \'\\\\Device\\\\HarddiskVolume1\\\\Windows\\\\System32\\\\cryptbase.dll\', status: \'scheduled\'}, {name: \'7za.exe\', device: \'Toad\', path: \'\\\\Device\\\\HarddiskVolume1\\\\temp\\\\7za.exe\', status: \'scheduled\'}]';

export type FileInfo = {
    name: string;
    device: string;
    path: string;
    status: string;
};

function fixJsonString(jsonLikeString: string): string {
    // Replace single quotes with double quotes
    let fixedString = jsonLikeString.replace(/'/g, '"');

    // Add double quotes around property names (words before a colon, not already quoted)
    fixedString = fixedString.replace(/(\w+):/g, '"$1":');

    return fixedString;
}

const parseJsonData = (text: string) => {
    const validateJson = fixJsonString(text);
    return JSON.parse(validateJson);
}


const initData = parseJsonData(initText);

const Main: React.FC = () => {
    const [dataText, setDataText] = useState<string>(initText);
    const [fileInfo, setFileInfo] = useState<FileInfo[]>(initData);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const contents = e.target.value;

        setDataText(contents);
        const actualData = parseJsonData(contents);
        setFileInfo(actualData);
    };

    return <div>

        <div> enter data here to be shown in the table:</div>

        <textarea
            value={dataText}
            onChange={handleTextChange}
            placeholder={'enter data here to display in the table'}
            className={styles.inputText}
        />

        <FileTable data={fileInfo}/>


    </div>;


};
export default Main;
