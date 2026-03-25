import { useMemo } from "react";

export const useSortLst = <T,>(list: T[], sortValue: keyof T) => {
    const sortedList = useMemo(() => {
        if (!list) return [];

        return [...list].sort((a, b) => {
            const valueA = String(a[sortValue]);
            const valueB = String(b[sortValue]);
            return valueA.localeCompare(valueB);
        });
    }, [list, sortValue]);

    return sortedList;
};

// I made a hook that sorts arrays
