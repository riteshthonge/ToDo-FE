import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import signupImg from '../assetes/task.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PushSpinner } from 'react-spinners-kit';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

function Signup() {
  const { backendUrl } = useContext(AppContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupHandler = async () => {
    setLoading(true);

    if (password !== rePassword) {
      toast.error("Password and confirm password do not match");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        phone,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message || "Signup successful!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className='container-fluid'>
        <Navbar />
        <div className="back-arrow position-absolute top-5 start-0 p-3">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        </div>

        <h2 className='text-start my-2 mt-5'>
          <strong>Hey User, Fill the Signup Form Below</strong>
        </h2>

        <div className='container p-3'>
          <form className='d-flex p-3 container rounded position-relative' style={{ zIndex: 2 }}>
            <div data-aos="fade-right" className='container col-md-7'>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="fName" placeholder="Name"
                  value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="fName">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="mobileNumber" placeholder="Mobile Number"
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label htmlFor="mobileNumber">Mobile Number</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="Email Id"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">Email Id</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Set Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password">Set Password</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="rePassword" placeholder="Re-enter Password"
                  value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                <label htmlFor="rePassword">Re-enter Password</label>
              </div>

              <p className='text-end'>
                <Link to='/' style={{ color: 'red', textDecoration: 'none' }}>
                  Already Have an Account?
                </Link>
              </p>

              <div className='text-center my-2'>
                <button className="btn btn-success w-75 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    signupHandler();
                  }}
                >
                  {loading ? (
                    <div className="container d-flex justify-content-center align-items-center">
                      <PushSpinner size={30} color="white" />
                    </div>
                  ) : 'Sign Up'}
                </button>
              </div>
            </div>

            <div data-aos="fade-left" className="container mx-auto my-auto loginImageContainer">
              <img id='signUpImage' src={signupImg} className='img-fluid' alt="Sign Up Background" />
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Signup;
