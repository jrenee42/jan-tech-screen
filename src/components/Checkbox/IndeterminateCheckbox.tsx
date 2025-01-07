import React, {useEffect, useRef} from 'react';

type IndeterminateCheckboxProps = {
    checked?: boolean;
    indeterminate?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
                                                                         checked = false,
                                                                         indeterminate = false,
                                                                         onChange,
                                                                     }) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <label>
            <input
                type="checkbox"
                ref={checkboxRef}
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
};

export default IndeterminateCheckbox;
