import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactDetails = [
    {
      icon: FiPhone,
      title: "Call us",
      text: "+1 (555) 014-7890",
    },
    {
      icon: FiMail,
      title: "Email us",
      text: "hello@modernstore.com",
    },
    {
      icon: FiMapPin,
      title: "Visit us",
      text: "245 Market Street, New York, NY",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Message sent");
    setFormData({ name: "", email: "", message: "" });
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,251,247,0.98),rgba(244,236,226,0.96))] shadow-[0_24px_70px_rgba(87,70,58,0.14)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Contact us
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Let’s make your next purchase feel effortless.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Whether you have a question about a product, need help with an order, or want recommendations, our team is ready to assist.
            </p>

            <div className="mt-6 space-y-3">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-7">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;