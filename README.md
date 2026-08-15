# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Directory tree:

```
e_commerce
├─ 📁public
│  └─ 📄vite.svg
├─ 📁src
│  ├─ 📁api
│  │  └─ 📄api.js
│  ├─ 📁assets
│  │  └─ 📄react.svg
│  ├─ 📁components
│  │  ├─ 📁admin
│  │  │  ├─ 📁categories
│  │  │  │  ├─ 📄AddCategoryForm.jsx
│  │  │  │  └─ 📄Category.jsx
│  │  │  ├─ 📁dashboard
│  │  │  │  ├─ 📄Dashboard.jsx
│  │  │  │  └─ 📄DashboardOverview.jsx
│  │  │  ├─ 📁orders
│  │  │  │  ├─ 📄Orders.jsx
│  │  │  │  ├─ 📄OrderTable.jsx
│  │  │  │  └─ 📄UpdateOrderForm.jsx
│  │  │  ├─ 📁product
│  │  │  │  ├─ 📄AddProductForm.jsx
│  │  │  │  ├─ 📄AdminProduct.jsx
│  │  │  │  └─ 📄ImageUploadform.jsx
│  │  │  ├─ 📁sellers
│  │  │  │  ├─ 📄AddSellerForm.jsx
│  │  │  │  ├─ 📄Sellers.jsx
│  │  │  │  ├─ 📄SellerTable.jsx
│  │  │  │  └─ 📄UseSellerFilter.jsx
│  │  │  └─ 📄AdminLayout.jsx
│  │  ├─ 📁auth
│  │  │  ├─ 📄Login.jsx
│  │  │  └─ 📄Register.jsx
│  │  ├─ 📁Carts
│  │  │  ├─ 📄Cart.jsx
│  │  │  ├─ 📄CartEmpty.jsx
│  │  │  ├─ 📄ItemContent.jsx
│  │  │  └─ 📄SetQuantity.jsx
│  │  ├─ 📁checkout
│  │  │  ├─ 📄AddAddressForm.jsx
│  │  │  ├─ 📄AddressInfo.jsx
│  │  │  ├─ 📄AddressInfroModal.jsx
│  │  │  ├─ 📄AddressList.jsx
│  │  │  ├─ 📄Checkout.jsx
│  │  │  ├─ 📄DeleteModal.jsx
│  │  │  ├─ 📄OrderSummary.jsx
│  │  │  ├─ 📄PaymentConfirmation.jsx
│  │  │  ├─ 📄PaymentForm.jsx
│  │  │  ├─ 📄PaymentMethod.jsx
│  │  │  ├─ 📄PaypalPayment.jsx
│  │  │  └─ 📄StripePayment.jsx
│  │  ├─ 📁helper
│  │  │  └─ 📄tableColumns.jsx
│  │  ├─ 📁Home
│  │  │  ├─ 📄Home.jsx
│  │  │  └─ 📄HomeBanner.jsx
│  │  ├─ 📁products
│  │  │  ├─ 📄Filter.jsx
│  │  │  └─ 📄Products.jsx
│  │  ├─ 📁Shared
│  │  │  ├─ 📄DeleteModal.jsx
│  │  │  ├─ 📄ErrorPage.jsx
│  │  │  ├─ 📄InputField.jsx
│  │  │  ├─ 📄Loader.jsx
│  │  │  ├─ 📄Modal.jsx
│  │  │  ├─ 📄Navbar.jsx
│  │  │  ├─ 📄Paginations.jsx
│  │  │  ├─ 📄ProductCard.jsx
│  │  │  ├─ 📄ProductViewModal.jsx
│  │  │  ├─ 📄SelectTextField.jsx
│  │  │  ├─ 📄Sidebar.jsx
│  │  │  ├─ 📄SkeletonAnimation.jsx
│  │  │  └─ 📄Status.jsx
│  │  ├─ 📄About.jsx
│  │  ├─ 📄BackDrop.jsx
│  │  ├─ 📄Contact.jsx
│  │  ├─ 📄PrivateRoute.jsx
│  │  └─ 📄UserMenu.jsx
│  ├─ 📁hooks
│  │  ├─ 📄useCategoryFilter.js
│  │  ├─ 📄useOrderFilter.js
│  │  └─ 📄useProductFilter.js
│  ├─ 📁store
│  │  ├─ 📁action
│  │  │  └─ 📄index.js
│  │  └─ 📁reducers
│  │     ├─ 📄adminReducer.js
│  │     ├─ 📄AuthReducer.js
│  │     ├─ 📄CartReducer.js
│  │     ├─ 📄ErrorReducer.js
│  │     ├─ 📄orderReducer.js
│  │     ├─ 📄paymentMethodReducer.js
│  │     ├─ 📄ProductReducer.js
│  │     ├─ 📄sellerReducer.js
│  │     └─ 📄store.js
│  ├─ 📁utils
│  │  ├─ 📄FormatPriceCalculation.js
│  │  ├─ 📄FormatRevenue.js
│  │  ├─ 📄index.js
│  │  ├─ 📄PriceFormat.js
│  │  └─ 📄TruncateText.js
│  ├─ 📄App.css
│  ├─ 📄App.jsx
│  ├─ 📄index.css
│  └─ 📄main.jsx
├─ 📄.env
├─ 📄.gitignore
├─ 📄eslint.config.js
├─ 📄index.html
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄README.md
└─ 📄vite.config.js
```