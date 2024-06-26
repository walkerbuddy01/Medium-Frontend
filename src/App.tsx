import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Blog from "./Pages/BlogShow";
import BlogSection from "./Pages/BlogSection";
import NewBlog from "./Pages/NewBlog";
import AuthLayout from "./Pages/AuthLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "./config/config";
import { login, logout } from "../store/AuthSlice";
import Dashboard from "./Pages/Dashboard";
import NumberTicker from "./Components/magicui/number-ticker";
import Profile from "./Pages/Profile";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  function fetchCurrentData() {
    axios({
      method: "get",
      headers: { Authorization: token },
      url: `${BackendUrl}/user/getCurrentUser`,
    })
      .then((response) => dispatch(login(response.data)))
      .catch(() => dispatch(logout()))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCurrentData();
  }, []);

  return loading ? (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-6xl font-semibold text-black dark:text-white">
        Loading Content...
      </h1>
      <p className="whitespace-pre-wrap text-5xl md:text-8xl font-medium tracking-tighter text-black dark:text-white">
        <NumberTicker value={100} />
      </p>
    </div>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout children={<Signup />} authentication={false} />
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout children={<Signup />} authentication={false} />
            }
          />
          <Route
            path="/signin"
            element={
              <AuthLayout children={<Signin />} authentication={false} />
            }
          />
          <Route
            path="/blog"
            element={
              <AuthLayout children={<BlogSection />} authentication={true} />
            }
          />
          <Route
            path="/blog/:id"
            element={<AuthLayout children={<Blog />} authentication={true} />}
          />
          <Route
            path="/createblog"
            element={
              <AuthLayout children={<NewBlog />} authentication={true} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthLayout children={<Dashboard />} authentication={true} />
            }
          />
          <Route
            path="/yourprofile"
            element={
              <AuthLayout children={<Profile />} authentication={true} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
