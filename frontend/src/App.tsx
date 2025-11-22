import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AccountSettings from "./pages/AccountSettingsPage/AccountSettings.tsx";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LoginSuccessful from "./pages/AuthPages/LoginSuccessful.tsx";
import Landing from "./pages/Landing.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import AuthGuard from "./components/auth/AuthGuard.tsx";
import CvExtractionPage from "./pages/CVExtractionpage/CvExtractionPage.tsx";
import CvAnalysis from "./pages/CVAnalysis/CvAnalysis.tsx";
import Recommendation from "./pages/RecommendationPage/Recommendation.tsx";
import ResumeBuilder from "./pages/ResumeBuilders/ResumeBuilder.tsx";
import PublicRoute from "./components/auth/PublicRoute.tsx";


export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <AuthProvider>
                    <Routes>
                        {/* Public routes that redirect to home if authenticated */}
                        <Route path="/" element={
                            <PublicRoute>
                                <Landing />
                            </PublicRoute>
                        } />
                        <Route path="/signin" element={
                            <PublicRoute>
                                <SignIn />
                            </PublicRoute>
                        } />
                        <Route path="/signup" element={
                            <PublicRoute>
                                <SignUp />
                            </PublicRoute>
                        } />
                        <Route path="/login/success" element={

                                <LoginSuccessful />

                        } />

                        {/* Dashboard Layout */}
                        <Route element={<AppLayout />}>
                            <Route element={<AuthGuard />}>
                                <Route path="/home" element={<Home />} />

                                {/* Others Page */}
                                <Route path="/profile" element={<UserProfiles />} />
                                <Route path="/account-settings" element={<AccountSettings />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/blank" element={<Blank />} />

                                <Route path="/CvExtractionPage" element={<CvExtractionPage />}/>
                                <Route path="/CvAnalysis" element={<CvAnalysis />}/>
                                <Route path="/Recommendation" element={<Recommendation/>}/>
                                <Route path="/resume-builder" element={<ResumeBuilder />} />

                                {/* Forms */}
                                <Route path="/form-elements" element={<FormElements />} />

                                {/* Tables */}
                                <Route path="/basic-tables" element={<BasicTables />} />

                                {/* Ui Elements */}
                                <Route path="/alerts" element={<Alerts />} />
                                <Route path="/avatars" element={<Avatars />} />
                                <Route path="/badge" element={<Badges />} />
                                <Route path="/buttons" element={<Buttons />} />
                                <Route path="/images" element={<Images />} />
                                <Route path="/videos" element={<Videos />} />

                                {/* Charts */}
                                <Route path="/line-chart" element={<LineChart />} />
                                <Route path="/bar-chart" element={<BarChart />} />
                            </Route>
                        </Route>

                        {/* Fallback Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </>
    );
}