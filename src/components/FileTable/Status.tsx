import React from 'react';
import classnames from "classnames";
import styles from './FileTable.module.scss';
import {AVAILABLE_STATUS} from "@/components/main/Main";

type StatusIndicatorProps = {
    status: string;
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({status}) => {
    // Capitalize the first letter of the word
    const capitalizeWord = (input: string) =>
        input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    // always take up the space; so the text is aligned:
    const statusCircleClass = classnames(styles.statusCircle, status === AVAILABLE_STATUS && styles.available);

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span className={statusCircleClass}/>
            <span>{capitalizeWord(status)}</span>
        </div>
    );
};

export default StatusIndicator;
