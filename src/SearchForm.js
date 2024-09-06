import React, { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";

export const SearchForm = ({ onSearch }) => {
    const { register } = useForm();

    // Memoize the debounced search function
    const debouncedSearch = useMemo(
        () => debounce((searchTerm) => {
            onSearch(searchTerm);
        }, 1000), // 1 second
        [onSearch]
    );

    // Use the debounced function in the change handler
    const handleChange = useCallback((event) => {
        const searchTerm = event.target.value;
        debouncedSearch(searchTerm);
    }, [debouncedSearch]);

    return (
        <form>
            <input
                className="Movie-search"
                type="text"
                placeholder="Search Movie"
                {...register("search", {
                    onChange: handleChange,
                })}
            />
        </form>
    );
};
