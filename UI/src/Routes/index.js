import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./routes.scss";
const InfluencersList = React.lazy(() => import("../Components/SearchResults/influencerlists"));
const ProfileData = React.lazy(() => import("../Components/ProfileData/profile"));
const Login = React.lazy(() => import("../Components/Login/login"));
const Signup = React.lazy(() => import("../Components/Signup/signup"));
const Lists = React.lazy(() => import("../Components/List Page/listcomponent"));
const BasketInfluencers = React.lazy(() => import("../Components/BasketInfluencers/index"));
const CalculateCost = React.lazy(() => import("../Components/Calculator/calculateinf"));
const UserLists = React.lazy(() => import("../Components/UserLists/lists"));
const CompareInfluencers = React.lazy(() => import("../Components/Compare/CompareInfluencers/compareinfluencers"));
const CompareLists = React.lazy(() => import("../Components/Compare/CompareList/comparelists"));
const ProfileSettings = React.lazy(() => import("../Components/ProfileSettings/index"));
const CalculateDeliverables = React.lazy(() => import('../Components/Calculator/Calculate2/index'));
const CalculateFilters = React.lazy(() => import('../Components/Calculator/Calculate3/index'));
const CalculateTotal = React.lazy(()=> import('../Components/Calculator/CalculateResults/index'));
const ResetPassword = React.lazy(()=> import('../Components/Login/forgot'))
const VerifyEmail = React.lazy(()=> import('../Components/Signup/verifyEmail'))

function RouteF() {

    return (
        <div>
            <Suspense
                fallback={<div className="load_parent">
                    <div className="loaderss"></div>
                </div>}
            >
                <Routes>
                    <Route path="/home/:id" element={<Lists />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/confirm/:token" element={<VerifyEmail />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
                    <Route path="/calculate" element={<CalculateCost />} />
                    <Route path="/influencerslist/" element={<InfluencersList />} />
                    <Route path="/influencerslist/:inputField" element={<InfluencersList />} />
                    <Route path="/influencerslist/:inputField/:eRange" element={<InfluencersList />} />
                    <Route path="/influencerslist//:eRange" element={<InfluencersList />} />
                    <Route path="/influencerslist//:followerRange" element={<InfluencersList />} />
                    <Route path="/influencerslist/:inputField/:followerRange" element={<InfluencersList />} />
                    <Route path="/influencerslist//:eRange/:followerRange" element={<InfluencersList />} />
                    <Route path="/influencerslist/:inputField/:eRange/:followerRange" element={<InfluencersList />} />
                    <Route path="/basketInfluencers/:categoryName" element={<BasketInfluencers />} />
                    <Route path="/userLists/:listname" element={<UserLists />} />
                    <Route path="/profile/:profilename" element={<ProfileData />} />
                    <Route path="/CompareInfluencers/:influencers" element={<CompareInfluencers />} />
                    <Route path="/CompareInfluencers" element={<CompareInfluencers />} />
                    <Route path="/CompareLists" element={<CompareLists />} />
                    <Route path="/CompareLists/:lists" element={<CompareLists />} />
                    <Route path="/updateprofile/:id" element={<ProfileSettings />} />
                    <Route path="/calculate/:budget/:followerRange" element={<CalculateDeliverables />} />
                    <Route path="/calculate/:budget/:followerRange/:deliverables" element={<CalculateFilters />} />
                    <Route path="/calculate/:budget/:followerRange/:deliverables/:demography" element={<CalculateTotal />} />
                </Routes>
            </Suspense>
        </div>
    )
}
export default RouteF;