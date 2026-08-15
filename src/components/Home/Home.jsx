import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HomeBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/action";
import ProductCard from "../Shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import About from "../About";
import Contact from "../Contact";
import Loader from "../Shared/Loader";

const Home = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const { products } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (!location.hash) {
            return;
        }

        const sectionId = location.hash.replace("#", "");
        const section = document.getElementById(sectionId);

        if (section) {
            const offset = 90;
            const topPosition = section.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: topPosition,
                behavior: "smooth"
            });
        }
    }, [location.hash]);

    return (
        <div id="home" className="home-page-shell lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner />
            </div>

            <section className="home-intro-card">
                <div className="home-intro-copy">
                    <p className="home-eyebrow">Curated for modern living</p>
                    <h2 className="home-section-title">Discover elevated essentials</h2>
                    <p className="home-section-copy">
                        A refined collection of standout pieces, thoughtfully arranged for the way you shop today.
                    </p>
                </div>
                <div className="home-pill-group">
                    <span className="home-pill">Premium quality</span>
                    <span className="home-pill">Fast delivery</span>
                    <span className="home-pill">Handpicked favorites</span>
                </div>
            </section>

            {isLoading ? (
                <Loader text="Loading products..." />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3x1 mr-2" />
                    <span className="text-slate-800 text-lg font-medium">
                        Error fetching product
                    </span>
                </div>
            ) : (
                <section id="products" className="home-products-section">
                    <div className="home-products-header">
                        <div>
                            <p className="home-eyebrow">Featured picks</p>
                            <h3 className="home-section-title">Premium products</h3>
                        </div>
                        <Link className="home-link-button" to="/products">
                            View all
                        </Link>
                    </div>
                    <div className="home-products-grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {products.map((item, i) => (
                            <ProductCard key={i} {...item} />
                        ))}
                    </div>
                </section>
            )}

            <section id="about" className="mt-8">
                <About />
            </section>

            <section id="contact" className="mt-8">
                <Contact />
            </section>
        </div>
    );
};

export default Home;