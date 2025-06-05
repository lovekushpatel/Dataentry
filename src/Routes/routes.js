import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";

// Import Calender
import Calender from "../Pages/Calender";


// Import E-mail
import Inbox from "../Pages/E-mail/Inbox";
import ReadEmail from "../Pages/E-mail/ReadEmail";
import EmailCompose from "../Pages/E-mail/EmailCompose";

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";

// Import Authentication Inner Pages
import Login1 from "../Pages/AuthenticationPages/Login";
import Register1 from "../Pages/AuthenticationPages/Register";
import RecoverPassword from "../Pages/AuthenticationPages/RecoverPassword";
import LockScreen from "../Pages/AuthenticationPages/LockScreen";

// Import Utility Pages
import StarterPage from "../Pages/Utility/Starter-Page";
import Maintenance from "../Pages/Utility/Maintenance-Page";
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
import TimeLine from "../Pages/Utility/TimeLine-Page";
import FAQs from "../Pages/Utility/FAQs-Page";
import Pricing from "../Pages/Utility/Pricing-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";

// Import UIElement Pages
import UiAlerts from "../Pages/UiElements/UiAlerts";
import UiBadge from "../Pages/UiElements/UiBadge";
import UiBreadcrumb from "../Pages/UiElements/UiBreadcrumb";
import UiButtons from "../Pages/UiElements/UiButtons";
import UiCards from "../Pages/UiElements/UiCards";
import UiCarousel from "../Pages/UiElements/UiCarousel";
import UiDropdown from "../Pages/UiElements/UiDropdowns";
import UiGrid from "../Pages/UiElements/UiGrid";
import UiImages from "../Pages/UiElements/UiImages";
import UiLightbox from "../Pages/UiElements/UiLightbox";
import UiModals from "../Pages/UiElements/UiModals";
import UiOffcanvas from "../Pages/UiElements/UiOffcanvas";
import UiRangeSlider from "../Pages/UiElements/UiRangeSlider";
import UiSessionTimeout from "../Pages/UiElements/UiSessionTimeout";
import UiPagination from "../Pages/UiElements/UiPagination";
import UiProgressBars from "../Pages/UiElements/UiProgressBars";
import UiPlaceholders from "../Pages/UiElements/UiPlaceholders";
import UiTabs from "../Pages/UiElements/UiTabs&Accordions";
import UiTypography from "../Pages/UiElements/UiTypography";
import UiToasts from "../Pages/UiElements/UiToasts";
import UiVideo from "../Pages/UiElements/UiVideo";
import UiPopovers from "../Pages/UiElements/UiPopovers&Tooltips";
import UiRating from "../Pages/UiElements/UiRating";

// Import Forms

// Import Tables
import BasicTable from "../Pages/Tables/BasicTable.js";
import DataTable from "../Pages/Tables/DataTables/DataTables";


// Import Charts
import ApexCharts from "../Pages/Charts/Genealogy.js";
import ChartJs from "../Pages/Charts/ChartjsCharts";
import Sparklinechart from "../Pages/Charts/SparklineCharts";
import FloatChart from "../Pages/Charts/FloatCharts";
import JknobCharts from "../Pages/Charts/JqueryKnobCharts";

// Import Icon Pages
import IconMaterialdesign from "../Pages/Icons/IconMaterialdesign";
import IconFontawesome from "../Pages/Icons/IconFontAwesome";
import IconDripicons from "../Pages/Icons/IconDrip";
import IconBoxicons from "../Pages/Icons/IconBoxicons"

// Import Map Pages
import VectorMaps from "../Pages/Maps/VectorMap";
import GoogleMap from "../Pages/Maps/GoogleMap";

import Genealogy from "../Pages/Charts/Genealogy.js";

import FormAddUser from "../Pages/Forms/FormAddUser.js";
import UsersList from "../Pages/Tables/UsersList.js";
import FromEditUsers from "../Pages/Forms/FromEditUsers.js";


import FormAddBanner from "../Pages/Forms/FormAddBanner.js";
import BannerList from "../Pages/Tables/BannerList.js";
import FormEditBanner from "../Pages/Forms/FormEditBanner.js";
import FormAddSubAgent from "../Pages/Forms/FormAddCategory.js";
import SubAgentList from "../Pages/Tables/CategoryList.js";
import FormEditSubAgent from "../Pages/Forms/FormEditCategory.js";
import KYCList from "../Pages/Tables/KYCList.js";
import FormAddCategory from "../Pages/Forms/FormAddCategory.js";
import CategoryList from "../Pages/Tables/CategoryList.js";
import FormEditCategory from "../Pages/Forms/FormEditCategory.js";
import FormAddMesurement from "../Pages/Forms/FormAddMesurement.js";
import MesurementsList from "../Pages/Tables/MesurementsList.js";
import FormEditMeasurement from "../Pages/Forms/FormEditMeasurement.js";
import OrdersList from "../Pages/Tables/OrdersList.js";
import FormList from "../Pages/Tables/FormList.js";
import FormViewUser from "../Pages/Tables/FormViewUser.js";
import TaskList from "../Pages/Tables/TaskList.js";
import ViewTaskList from "../Pages/Tables/ViewTaskList.js";



const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Calender
  { path: "/calendar", component: <Calender /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },

  // E-mail
  { path: "/inbox", component: <Inbox /> },
  { path: "/read-email", component: <ReadEmail /> },
  { path: "/compose-email", component: <EmailCompose /> },

  // Utility Pages
  { path: "/pages-starter", component: <StarterPage /> },
  { path: "/pages-timeline", component: <TimeLine /> },
  { path: "/pages-faqs", component: <FAQs /> },
  { path: "/pages-pricing", component: <Pricing /> },

  // UiElements Pages
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badge", component: <UiBadge /> },
  { path: "/ui-breadcrumb", component: <UiBreadcrumb /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-sessiontimeout", component: <UiSessionTimeout /> },
  { path: "/ui-pagination", component: <UiPagination /> },
  { path: "/ui-progressbars", component: <UiProgressBars /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-tabs-accordions", component: <UiTabs /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-popovers", component: <UiPopovers /> },
  { path: "/ui-rating", component: <UiRating /> },

  // Forms pages
  { path: "/add-users", component: <FormAddUser /> },
  { path: "/getall-form", component: <FormList /> },
  { path: "/getall-users", component: <UsersList /> },
  { path: "/view-user/:id", component: <FormViewUser /> },
  { path: "/edit-user/:id", component: <FromEditUsers /> },
  { path: "/list-task", component: <TaskList /> },
  { path: "/view-task/:id", component: <ViewTaskList /> },

  { path: "/add-category", component: <FormAddCategory /> },
  { path: "/list-category", component: <CategoryList /> },
  { path: "/edit-category/:id", component: <FormEditCategory /> },
  { path: "/add-measurement", component: <FormAddMesurement /> },
  { path: "/list-measurement", component: <MesurementsList /> },
  { path: "/edit-measurement/:id", component: <FormEditMeasurement/> },
  { path: "/list-orders", component: <OrdersList /> },
  { path: "/add-banner", component: <FormAddBanner /> },
  { path: "/list-banner", component: <BannerList /> },
  { path: "/edit-banner/:id", component: <FormEditBanner /> },
  { path: "/list-kyc", component: <KYCList /> },
  { path: "/tables-basic", component: <BasicTable /> },
  { path: "/table-datatables", component: <DataTable /> },

  // Charts Pages
  { path: "/chart-genealogy", component: <Genealogy /> },
  { path: "/chart-chartjscharts", component: <ChartJs /> },
  { path: "/chart-floatcharts", component: <FloatChart /> },
  { path: "/chart-jknobcharts", component: <JknobCharts /> },
  { path: "/chart-sparklinecharts", component: <Sparklinechart /> },

  // Icons Pages
  { path: "/icon-boxicon", component: <IconBoxicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icon-dripicons", component: <IconDripicons /> },

  // Maps Pages
  { path: "/maps-vector", component: <VectorMaps /> },
  { path: "/maps-google", component: <GoogleMap /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },

 
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner Pages
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <RecoverPassword /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },

  // Utility Pages
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
