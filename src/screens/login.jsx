import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assetes/login.png";
import gmail from "../assetes/gmail.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PushSpinner } from "react-spinners-kit";
import MobileLogin from "../components/modals/mobileLogin";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const { backendUrl, getUserData, setToken, token } = useContext(AppContext);

  const loginHandler = async () => {
    if (!phone || !password) {
      toast.error("Please enter your phone number and password");
      return;
    }

    setLoading(true);
    console.log("hi " + phone);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        phone,
        password,
      });

      setLoading(false);

      if (data.success) {
        await setToken(data.data);
        localStorage.setItem("token", JSON.stringify(data.data));
       
        toast.success(
          data.message + "please wait " || "Login successful!  wait"
        );

      

      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container-fluid position-relative">
      <Navbar />
      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2x"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
      <MobileLogin
        visiblePin={showMobileLogin}
        setVisiblePin={setShowMobileLogin}
      />

      <div className="container d-flex justify-content-end gap-10 loginForm position-relative border shadow p-3 mt-5">
        {/* Form Section */}
        <div data-aos="fade-right" className="container">
          <div className="p-3">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="98XXXXXXXXXX"
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="floatingInput">Mobile Number</label>
            </div>

            <div className="form-floating position-relative">
              <input
                type={passwordType}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer", zIndex: 2 }}
                onClick={() => {
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  );
                  setIcon(passwordType === "password" ? eye : eyeOff);
                }}
              >
                <Icon icon={icon} size={22} />
              </span>
              <label htmlFor="floatingPassword">Password</label>

              <div className="text-end mt-3">
                <Link
                  style={{ color: "red", textDecoration: "none" }}
                  to="/forgot-password"
                >
                  Forgotten Password?
                </Link>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                id="signupButton"
                className="btn btn-success w-75 text-center"
                onClick={loginHandler}
                disabled={loading}
              >
                {loading ? <PushSpinner size={30} color="white" /> : "Log in"}
              </button>
            </div>
          </div>

          <div>
            <hr className="w-75 mx-auto" />
            <h5 className="text-center">
              <strong>OR</strong>
            </h5>
            <div className="container text-center">
              <p
                className="border mobile-login border-black btn p-2 rounded"
                onClick={() => setShowMobileLogin(true)}
              >
                <img
                  src={gmail}
                  alt="Gmail"
                  className="img-fluid gmail-logo mx-3"
                />
                Log in with OTP
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div data-aos="fade-left" className="container loginImageContainer">
          <img
            src={loginImg}
            alt="Login"
            className="img-fluid"
            style={{ width: "400px", height: "400px", zIndex: -1 }}
          />
        </div>
      </div>

      {/* Background Corner Image */}
      <img
        id="signUpImage"
        src={loginImg}
        className="img-fluid position-absolute top-0 start-0"
        style={{ width: "200px", height: "200px", zIndex: -1 }}
        alt="Login"
      />

      <div className="d-flex justify-content-center mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
