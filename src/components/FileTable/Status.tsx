import React from 'react';
import classnames from "classnames";
import styles from './FileTable.module.scss';

type StatusIndicatorProps = {
    status: string;
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({status}) => {
    // Capitalize the first letter of the word
    const capitalizeWord = (input: string) =>
        input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    const statusCircleClass = classnames(styles.statusCircle, status === 'available' && styles.available);

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>

            <span className={statusCircleClass}/>
            <span>{capitalizeWord(status)}</span>
        </div>
    );
};

export default StatusIndicator;
