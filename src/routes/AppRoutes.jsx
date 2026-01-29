// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
// import HomePage from '../pages/HomePage';
import SplashScreen from "../components/SplashScreen";
import Home from "../pages/Home";
import Services from "../pages/services/Services";
import MainLayout from "../layout/mainLayout";
import Billing from "../pages/Billing";
import Bio from "../pages/Bio";
import StrategicCommunications from "../pages/services/Strategic-communications";
import BusinessDevelopment from "../pages/services/Business-development";
import NonProfitDevelopment from "../pages/services/NonProfiledevelopment";
import AppLayout from "../layout/AppLayout";
import Portfolio from "../pages/Portfolio";
import EnrollmentApplication from "../pages/EnrollmentApplication";

export default function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/enrollment-application"
            element={<EnrollmentApplication />}
          />
          <Route path="/bio" element={<Bio />} />
          <Route
            path="/strategic-communications"
            element={<StrategicCommunications />}
          />
          <Route
            path="/business-development"
            element={<BusinessDevelopment />}
          />
          <Route
            path="/non-profit-development"
            element={<NonProfitDevelopment />}
          />
        </Route>
      </Routes>
    </AppLayout>
  );
}
