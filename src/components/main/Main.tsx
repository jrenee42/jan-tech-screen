'use client';

import {useState} from "react";


const initText = '[{name: \'smss.exe\', device: \'Mario\', path: \'\\\\Device\\\\HarddiskVolume2\\\\Windows\\\\System32\\\\smss.exe\', status: \'scheduled\'}, {name: \'netsh.exe\', device: \'Luigi\', path: \'\\\\Device\\\\HarddiskVolume2\\\\Windows\\\\System32\\\\netsh.exe\', status: \'available\'}, {name: \'uxtheme.dll\', device: \'Peach\', path: \'\\\\Device\\\\HarddiskVolume1\\\\Windows\\\\System32\\\\uxtheme.dll\', status: \'available\'}, {name: \'aries.sys\', device: \'Daisy\', path: \'\\\\Device\\\\HarddiskVolume1\\\\Windows\\\\System32\\\\aries.sys\', status: \'scheduled\'}, {name: \'cryptbase.dll\', device: \'Yoshi\', path: \'\\\\Device\\\\HarddiskVolume1\\\\Windows\\\\System32\\\\cryptbase.dll\', status: \'scheduled\'}, {name: \'7za.exe\', device: \'Toad\', path: \'\\\\Device\\\\HarddiskVolume1\\\\temp\\\\7za.exe\', status: \'scheduled\'}]';


type FileInfo = {
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

const Main: React.FC = () => {
    const [dataText, setDataText] = useState<string>(initText);


    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const contents = e.target.value;

        setDataText(contents);
        console.log("hi there...");
        const validJsonString = fixJsonString(contents);
        console.log("valid???", validJsonString);
        const parsed = JSON.parse(validJsonString);
        console.log("parsed data?", parsed);
    };

    return <div> main stuff goes here

        <textarea
            value={dataText}
            onChange={handleTextChange}
            placeholder={'entere data here to display in the table'}
            style={{
                width: '95%',
                minHeight: '8em', // 1em is roughly one line of text
                padding: '10px',
                fontSize: '1rem',
                lineHeight: '1.5',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'vertical', // Allow resizing vertically
            }}
        />


    </div>;


};
export default Main;
