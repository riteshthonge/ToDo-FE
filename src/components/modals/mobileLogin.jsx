import React, { useContext, useState } from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
  CHeader,
} from "@coreui/react";

import { ToastContainer, toast } from "react-toastify";
import { PushSpinner } from "react-spinners-kit";

import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function MobileLogin({ visiblePin, setVisiblePin }) {
  const navigate = useNavigate();
  const { getUserData, token, setToken, backendUrl } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendOtploading, setSendOtploading] = useState(false);
  const [sendOtp, setSendOtp] = useState("");

  const submitForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp,
      });
   
      if (data.success) {
        setToken(data.data);
        localStorage.setItem("token", JSON.stringify(data.data));
          toast.success(data.success);
       setTimeout(() => {
  
}, 500); 
   setLoading(false);

      
    
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const sendOtpForm = async () => {
    try {
      setSendOtploading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/user/send-otp`,

        {
          email: email,
        }
      );

      setSendOtploading(false);
      if (data.success) {
        toast.success(data.message);
        setSendOtp(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <CModal
        visible={visiblePin}
        alignment="center"
        onClose={() => setVisiblePin(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalBody>
          <div className="container">
            <div className=" d-flex flex-column">
              <div className="form-floating  mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  readOnly={sendOtp}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="fName">Email</label>
              </div>
              <button
                className="btn btn-success align-self-end my-1"
                disabled={sendOtp}
                onClick={sendOtpForm}
              >
                {sendOtploading ? (
                  <div className="container  d-flex justify-content-center align-items-center">
                    <PushSpinner size={30} color="white" />
                  </div>
                ) : (
                  "Send Otp"
                )}
              </button>
            </div>
            <div className="form-floating  mb-3">
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="OTP"
                readOnly={!sendOtp}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label htmlFor="fName">OTP</label>
            </div>
            <div className="text-center mt-4">
              <button
                id="signupButton"
                className="btn btn-primary w-75 text-center"
                disabled={!sendOtp}
                onClick={submitForm}
              >
                {loading ? (
                  <div className="container  d-flex justify-content-center align-items-center">
                    <PushSpinner size={30} color="white" />
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePin(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default MobileLogin;
