import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {

    const [searchParams] = useSearchParams();
    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortOrder") || "asc";
        const currentSearchItem = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchItem);
    }, [searchParams]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const nextParams = new URLSearchParams(searchParams);

        if (selectedCategory === "all") {
            nextParams.delete("category");
        } else {
            nextParams.set("category", selectedCategory);
        }

        navigate(`${pathName}?${nextParams.toString()}`);
        setCategory(selectedCategory);
    };

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        const nextParams = new URLSearchParams(searchParams);

        nextParams.set("sortOrder", newSortOrder);
        navigate(`${pathName}?${nextParams.toString()}`);
        setSortOrder(newSortOrder);
    };

    const clearFilter = () => {
        navigate(pathName);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            const nextParams = new URLSearchParams(searchParams);

            if (searchTerm) {
                nextParams.set("keyword", searchTerm);
            } else {
                nextParams.delete("keyword");
            }

            navigate(`${pathName}?${nextParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        }

    }, [searchParams, searchTerm, navigate, pathName]);

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Products"
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" />
                <FiSearch className="absolute left-3 text-slate-800" size={20} />
            </div>

            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small"
                    fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        className="min-w-[120px] text-slate-800 border-slate-700"
                        id="category-select"
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="all">All</MenuItem>

                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>

                        ))}
                    </Select>
                </FormControl>

                <Tooltip title={`Sorted by price : ${sortOrder}`}>
                    <Button variant="contained"
                    onClick={toggleSortOrder}
                    color="primary" 
                    className="flex items-center gap-2 h-10 w-60"
                    >
                        Sort By
                        {sortOrder === "asc" ? (
                        <FiArrowUp size={20} />
                        )
                        : (
                        <FiArrowDown size={20} />
                        )}
                    </Button>
                </Tooltip>

                <button 
                onClick={clearFilter}
                className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-hidden h-10 w-60">
                    <FiRefreshCcw className="font-semibold" size={20}/>

                    <span>Clear Filter</span>
                </button>
            </div>
        </div>
    )
};

export default Filter;