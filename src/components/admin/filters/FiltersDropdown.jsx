import "./TableFilters.css";
import { useEffect, useRef, useState } from "react";
import { buttonStyle, } from "./filterStyles";
import { Filter, ChevronDown } from "lucide-react";

export default function FiltersDropdown({
    children,
}) {
    const [open, setOpen] =
        useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                ref.current &&
                !ref.current.contains(
                    event.target
                )
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div
            ref={ref}
            className="filters-dropdown"
        >
            <button
                onClick={() => setOpen(!open)}
                style={buttonStyle}
            >
                <Filter size={16} />
                Filtros
                <ChevronDown
                    size={14}
                    className={`filters-dropdown-chevron ${open ? "open" : ""
                        }`}
                />
            </button>

            {open && (
                <div
                    className="filters-dropdown-menu"
                >
                    {children}
                </div>
            )}
        </div>
    );
}