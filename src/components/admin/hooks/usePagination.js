import { useMemo, useState, useEffect } from "react";

export default function usePagination(items = [], initialSize = 10) {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(initialSize);

    const totalElements = items.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalElements / size)
    );

    const paginatedItems = useMemo(() => {
        const start = page * size;
        return items.slice(start, start + size);
    }, [items, page, size]);

    const changePage = (newPage) => {
        if (newPage < 0) return;
        if (newPage >= totalPages) return;

        setPage(newPage);
    };

    const changeSize = (newSize) => {
        setSize(newSize);
        setPage(0);
    };

    useEffect(() => {
        if (page >= totalPages) {
            setPage(0);
        }
    }, [items, page, totalPages]);

    return {
        page,
        size,
        totalPages,
        totalElements,
        paginatedItems,
        changePage,
        changeSize,
    };
}