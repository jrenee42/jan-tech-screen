import React, {useEffect, useRef} from 'react';
import styles from "./CheckboxWithTooltip.module.scss";

type IndeterminateCheckboxProps = {
    checked?: boolean;
    indeterminate?: boolean;
    onChange: () => void;
    disabled?: boolean;
    tooltip?: string;
};

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
                                                                         checked = false,
                                                                         indeterminate = false,
                                                                         onChange,
                                                                         disabled = false,
                                                                         tooltip = 'not enabled',
                                                                     }) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                ref={checkboxRef}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            {disabled && <div className={styles.tooltip}>{tooltip}</div>}
        </div>
    );
};

export default IndeterminateCheckbox;
