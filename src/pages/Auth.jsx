import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Navbar } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { faComments, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginApi, registerApi } from '../services/allApi';

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const primaryBlue = '#132855';

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  const query = useQuery();
  const initialMode = query.get('mode') === 'register';
  const [isRegister, setIsRegister] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setUserDetails({ username: '', email: '', password: '' });
  };

  const handleRegister = async () => {
    setLoading(true);
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.warning('Please fill all fields');
      setLoading(false);
      return;
    }
    try {
      const res = await registerApi({ username, email, password });
      if (res.status === 201) {
        toast.info('Registered successfully');
        setIsRegister(false);
        setUserDetails({ username: '', email: '', password: '' });
      } else {
        toast.error(res.response?.data?.message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.warning('Please fill all fields');
      setLoading(false);
      return;
    }
    if (email === 'admin' && password === 'admin123') {
      toast.info('Admin login successful!');
      sessionStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      setTimeout(() => navigate('/admin'), 1500);
      setLoading(false);
      return;
    }
    try {
      const res = await LoginApi({ email, password });
      if (res.status === 201) {
        toast.info('Login Successful');
        sessionStorage.setItem('user', JSON.stringify({ email, role: 'user', token: res.data.token }));
        setTimeout(() => navigate('/feedback'), 1500);
      } else {
        toast.error(res.response?.data?.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <Navbar bg="light" className="shadow-sm mb-4" style={{ borderBottom: `2px solid ${primaryBlue}` }}>
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <FontAwesomeIcon icon={faComments} className='me-2' style={{ color: primaryBlue }} />
            <span style={{ color: primaryBlue, fontWeight: 'bold', fontSize: '1.25rem' }}>
              Feedlytics
            </span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-white p-0">
        <Row className="w-100 m-0" style={{ maxWidth: '900px', height: '80vh', boxShadow: '0 0 15px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>

          {/* Left image side */}
          <Col
            md={6}
            className="d-none d-md-block"
            style={{
              backgroundImage: 'url(img.jpg)',

              // backgroundImage: "url('https://t3.ftcdn.net/jpg/04/67/96/14/360_F_467961418_UnS1ZAwAqbvVVMKExxqUNi0MUFTEJI83.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Form side */}
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center p-3 bg-white" >
            <Card className="shadow-sm w-100" style={{ maxWidth: '400px' }}>
              <Card.Body>
                <h3 className="text-center mb-3" style={{ color: primaryBlue }}>
                  {isRegister ? 'Register' : 'Login'}
                </h3>

                <Form>
                  {isRegister && (
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={userDetails.username}
                        onChange={(e) =>
                          setUserDetails({ ...userDetails, username: e.target.value })
                        }
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={userDetails.password}
                        onChange={(e) =>
                          setUserDetails({ ...userDetails, password: e.target.value })
                        }
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        onClick={() => setShowPassword(!showPassword)}
                        className="position-absolute end-0 top-50 translate-middle-y me-3 text-secondary"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100 mb-2"
                    onClick={isRegister ? handleRegister : handleLogin}
                    disabled={loading}
                    style={{ backgroundColor: primaryBlue, borderColor: primaryBlue }}
                  >
                    {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
                  </Button>
                </Form>

                <div className="text-center" style={{ color: primaryBlue }}>
                  {isRegister ? (
                    <p>
                      Already have an account?{' '}
                      <span
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={handleToggle}
                      >
                        Login
                      </span>
                    </p>
                  ) : (
                    <p>
                      New user?{' '}
                      <span
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={handleToggle}
                      >
                        Register
                      </span>
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-light text-center py-3 mt-4 border-top">
        <small className="text-muted">© 2025 Feedlytics. All rights reserved.</small>
      </footer>

      <style>{`
        @media (max-width: 767.98px) {
          .d-none.d-md-block {
            display: none !important;
          }
          .min-vh-100 {
            height: auto !important;
            padding: 2rem 1rem;
          }
          .card {
            box-shadow: none !important;
          }
          footer {
            margin-top: 2rem !important;
          }
        }
      `}</style>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default Auth;