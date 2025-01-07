import React from "react";
import styles from "./CheckboxWithTooltip.module.scss";

type CheckboxWithTooltipProps = {
    tooltip?: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

const Checkbox: React.FC<CheckboxWithTooltipProps> = ({
                                                          tooltip = 'not enabled',
                                                          checked,
                                                          onChange,
                                                          disabled = false,
                                                      }) => {
    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.checkbox}
            />
            {disabled && <div className={styles.tooltip}>{tooltip}</div>}
        </div>
    );
};

export default Checkbox;
