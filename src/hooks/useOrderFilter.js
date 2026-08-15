import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrdersForDashboard } from "../store/action";

const useOrderFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);

        const categoryParams = params.get("category") || null;
        const sortOrder = params.get("sortOrder") || "asc";
        const keyword = params.get("keyword") || null;

        params.set("sortOrder", sortOrder);
        params.set("sortBy", "price");

        if (categoryParams)
            params.set("category", categoryParams);

        if (keyword)
            params.set("keyword", keyword);

        const queryString = params.toString();

        dispatch(getOrdersForDashboard(queryString, isAdmin));
    }, [searchParams, dispatch, isAdmin]);
};

export default useOrderFilter;