import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import UserDashboard from "./components/User";
import UserCart from "./components/User/cart";
import EditUser from "./components/User/editUser";

// import AddProduct from './components/User/UserAddProduct';
// import UserAds from './components/User/userAds';

import SiteNfo from "./components/User/Admin/siteNfo";

import TestUtils from "./components/TestUtils";
import Layout from "./hoc/layout";

import ShowProducts from "./components/User/Admin/show_products";
import AddProduct from "./components/User/Admin/add_product";
import ListUsers from "./components/User/Admin/Users/listUsers";
import ListSubsribers from './components/User/Admin/Subscribers/listSubscribers'

import CategoryPage from "./components/User/Admin/Categories/category_page";
import Shop from "./components/Shop";
import Contact from "./components/Contact";


import ManageCategories from './components/User/Admin/manage_categories'

import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import Auth from './hoc/auth'

import UserRequests from './components/User/Admin/UserRequests'
import UserReponsePage from './components/User/Admin/UserRequests/ResponRequest'
import ProductPage from './components/Product';


import ManageSite from './components/User/Admin/manage_site';
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/Register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user_profile" exact component={Auth(EditUser, true)} />

        

        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/admin/category/:id"
          exact
          component={Auth(CategoryPage, true)}
        />

        <Route path="/admin/show_product" exact component={Auth(ShowProducts, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/add_product/:id" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/users_list" exact component={Auth(ListUsers, true)} />
        <Route path="/admin/subscribers_list" exact component={Auth(ListSubsribers, true)} />
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/test_utils" exact component={TestUtils} />
        <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />

        <Route path="/admin/site_info" exact component={Auth(ManageSite,true)}/>


        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/contact" exact component={Auth(Contact, null)} />
        <Route path="/admin/user_requests" exact component={Auth(UserRequests, true)} />
        <Route path="/admin/contact/:id" exact component={Auth(UserReponsePage, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
