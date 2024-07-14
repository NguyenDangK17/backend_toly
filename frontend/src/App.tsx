import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import { ChatState } from "./context/ChatProvider";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landingpage";
import NotFound from "./pages/NotFound404Page";
import ContactForm from "./pages/ContactForm";
import UserProfilePage from "./pages/Profile/UserProfile";
import ExplorePage from "./pages/Explore/ExplorePage";
import { ChakraProvider } from "@chakra-ui/react";
import ForgotPass from "./pages/ForgotPass";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import SearchExplore from "./pages/SearchExplore";
import ExploreDetailPage from "./pages/ExploreDetailPage";
import FriendsPage from "./pages/FriendsPage";
import AdminPage from "./pages/AdminPage";
import TolymiumPage from "./pages/TolymiumPage";
import SuccessPage from "./pages/ResultPage/SuccessPage";
import FailPage from "./pages/ResultPage/FailPage";
import EditProfile from "./pages/EditProfile";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  const { user } = ChatState();

  return (
    <div className="h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/chats"
          element={
            user ? (
              <ChakraProvider>
                <ChatPage />
              </ChakraProvider>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              user.isAdmin ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/home" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchExplore" element={<SearchExplore />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore/:id" element={<ExploreDetailPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tolymium" element={<TolymiumPage />} />
        <Route path="/successPay" element={<SuccessPage />} />
        <Route path="/failPay" element={<FailPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        {/* <Route
          path="/admin"
          element={
            user ? (
              user.isAdmin ? (
                <AdminPage />
              ) : (
                <Navigate to="/chats" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
