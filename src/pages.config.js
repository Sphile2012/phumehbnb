/**
 * pages.config.js - Page routing configuration
 *
 * Pages are registered by importing files from the ./pages/ folder.
 *
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 */
import Home from './pages/Home.jsx';
import PropertyDetail from './pages/PropertyDetail';
import CreateListing from './pages/CreateListing';
import Trips from './pages/Trips';
import MyListings from './pages/MyListings';
import Wishlists from './pages/Wishlists';
import HostDashboard from './pages/HostDashboard';
import Profile from './pages/Profile';
import Services from './pages/Services.jsx';
import Experiences from './pages/Experiences.jsx';
import Login from './pages/Login.jsx';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "PropertyDetail": PropertyDetail,
    "CreateListing": CreateListing,
    "Trips": Trips,
    "MyListings": MyListings,
    "Wishlists": Wishlists,
    "HostDashboard": HostDashboard,
    "Profile": Profile,
    "Services": Services,
    "Experiences": Experiences,
    "Login": Login,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};