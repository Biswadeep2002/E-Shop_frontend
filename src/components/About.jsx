import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiShield, FiStar, FiTruck } from "react-icons/fi";
import ProductCard from "./Shared/ProductCard";
import { fetchProducts } from "../store/action";

const About = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = [...products]
    .filter((product) => Number(product?.price ?? product?.specialPrice ?? 0) > 0)
    .sort((a, b) => {
      const priceA = Math.max(Number(a?.price ?? 0), Number(a?.specialPrice ?? 0));
      const priceB = Math.max(Number(b?.price ?? 0), Number(b?.specialPrice ?? 0));
      return priceB - priceA;
    })
    .slice(0, 3);

  const highlights = [
    {
      icon: FiStar,
      title: "Curated essentials",
      text: "Every product is hand-picked for quality, style, and everyday usefulness.",
    },
    {
      icon: FiTruck,
      title: "Fast delivery",
      text: "From order to doorstep, we keep the experience smooth and dependable.",
    },
    {
      icon: FiShield,
      title: "Trusted support",
      text: "Our team is here to guide you before, during, and after every purchase.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,251,247,0.98),rgba(244,236,226,0.96))] shadow-[0_24px_70px_rgba(87,70,58,0.14)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              About our store
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Modern shopping, thoughtfully curated for everyday living.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              We bring premium devices, stylish essentials, and a seamless buying experience together in one place. Every detail is designed to feel polished, simple, and genuinely helpful.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Explore products
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                Our story
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-linear-to-br from-violet-500/20 via-amber-400/10 to-slate-900/10" />
            <img
              src="https://images.unsplash.com/photo-1763872011479-aa293bf083a8?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Modern shopping experience"
              className="relative h-full min-h-70 w-full rounded-[28px] object-cover shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-slate-950/80 p-4 text-white backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
                Why customers return
              </p>
              <p className="mt-1 text-sm text-slate-200">
                Thoughtful service, beautiful products, and a checkout experience that feels effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section
        id="story"
        className="mt-8 grid gap-6 rounded-[28px] border border-slate-200/70 bg-white/70 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
            Our story
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Built around confidence, convenience, and style.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            We started with a simple idea: shopping should feel inspiring, not overwhelming. That is why we focus on clean design, honest product details, and a curated collection that makes decision-making easier.
          </p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Whether you are upgrading your gear or picking a thoughtful gift, our goal is to deliver a purchase experience that feels rewarding from start to finish.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quality first
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We prioritize products that look great, perform well, and stand the test of time.
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Thoughtful service
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Friendly support and clear guidance help every shopper feel informed and confident.
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Designed to delight
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              From the first glance to the final checkout, every part of the experience is shaped to feel calm, elegant, and modern.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Featured products
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              A few favorites from our collection
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <p className="text-sm text-slate-600 md:col-span-2 xl:col-span-3">
              Loading featured products...
            </p>
          ) : errorMessage ? (
            <p className="text-sm text-slate-600 md:col-span-2 xl:col-span-3">
              Unable to load featured products right now.
            </p>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <ProductCard
                key={product?.productId ?? index}
                productName={product.productName}
                image={product.image}
                description={product.description}
                quantity={product.quantity}
                price={product.price}
                specialPrice={product.specialPrice}
                about={true}
              />
            ))
          ) : (
            <p className="text-sm text-slate-600 md:col-span-2 xl:col-span-3">
              No featured products available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;