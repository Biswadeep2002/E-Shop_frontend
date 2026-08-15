import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../Shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories } from "../../store/action";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Paginations from "../Shared/Paginations";
import Loader from "../Shared/Loader";


const Products = () => {
    const [searchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("sortOrder") || "asc";

    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    )

    const { products, categories, pagination } = useSelector(
        (state) => state.products
    )

    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const sortedProducts = [...(products || [])].sort((a, b) => {
        const aPrice = Number(a.specialPrice ?? a.price ?? 0);
        const bPrice = Number(b.specialPrice ?? b.price ?? 0);

        return currentSortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
    });

    return (

        <div className="lg:px-14 sm:px-8 px-4 py-14 2x1:w-[99%] 2x1:mx-auto">
            <Filter categories = {categories ? categories : []}/>
            {isLoading ? (
                <Loader text="Loading products..." />
            ) : errorMessage ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <FaExclamationTriangle className="text-slate-800 text-3x1 mr-2" />
                        <span className="text-slate-800 text-lg font-medium">
                            {errorMessage}
                        </span>
                    </div>

                ) : (
                    <div className="min-h-[700px]">
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {sortedProducts.length > 0 && sortedProducts.map((item, i) => (
                                <ProductCard key={item.productId || i} {...item} />
                            ))}

                        </div>
                        <div className="flex justify-center pt-10">
                            <Paginations
                            numberOfPage = {pagination.totalPages}/>
                        </div>
                    </div>

                )

            }

        </div>



    );
};

export default Products;