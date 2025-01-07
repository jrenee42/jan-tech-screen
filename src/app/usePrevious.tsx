import {useEffect, useRef} from "react";

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>(undefined);

    useEffect(() => {
        ref.current = value; // Update the ref to the current value
    }, [value]); // Runs whenever the value changes

    return ref.current; // Return the previous value
}

