import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faStar } from '@fortawesome/free-solid-svg-icons';
import { feedbackApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const primaryBlue = '#132855';

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!comment || rating === 0) {
      toast.warning('Please provide both comment and rating');
      return;
    }

    const reqBody = { comment, rating };
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const token = storedUser?.token;

    if (!token) {
      toast.error('No token found. Please log in again.');
      return;
    }

    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const result = await feedbackApi(reqBody, reqHeader);
      if (result.status === 200 || result.status === 201) {
        toast.info('Feedback submitted!');
        setComment('');
        setRating(0);
      } else {
        toast.error(result.response?.data || 'Failed to submit feedback');
      }
    } catch (error) {
      toast.error('Server error while submitting feedback');
      console.error(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    toast.info('Logged out successfully');

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <>
      <Navbar bg="light" className="shadow-sm " style={{ borderBottom: `2px solid ${primaryBlue}` }}>
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <FontAwesomeIcon icon={faComments} className='me-2' style={{ color: primaryBlue }} />
            <span style={{ color: primaryBlue, fontWeight: 'bold', fontSize: '1.25rem' }}>
              Feedlytics
            </span>
          </Navbar.Brand>
          <Nav>
            <Button
              variant="outline-primary"
              onClick={handleLogout}
              style={{ fontWeight: '600', borderColor: primaryBlue, color: primaryBlue }}
              className="logout-btn"
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>


      <Container fluid className="p-0">
        <Row className="m-0 flex-column flex-md-row" style={{ minHeight: '100vh' }}>
          <Col
            xs={12} md={6}
            className="image-col"
            style={{
              backgroundImage: 'url(img.jpg)',
              // backgroundImage: 'url(https://t3.ftcdn.net/jpg/04/67/96/14/360_F_467961418_UnS1ZAwAqbvVVMKExxqUNi0MUFTEJI83.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
              padding: '3rem',
              fontWeight: '600',
              fontSize: '2rem',
              userSelect: 'none',
              borderRadius: '0 0 20px 20px',
            }}
          >
            <div className="image-text">
              <h2>Your Feedback Matters</h2>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '400', marginTop: '1rem' }}>
                Help us improve by sharing your honest thoughts and ratings.
              </p>
            </div>
          </Col>

          <Col
            xs={12} md={6}
            className="d-flex align-items-center justify-content-center p-4"
            style={{ backgroundColor: 'white' }}
          >
            <Card className="shadow-sm p-4 w-100" style={{ maxWidth: '450px', borderRadius: '20px' }}>
              <h3 className="mb-4 text-center" style={{ color: primaryBlue }}>
                Share Your Feedback
              </h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: '600' }}>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your thoughts here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ borderColor: primaryBlue }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '600' }}>Rating</Form.Label>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                          cursor: 'pointer',
                          color: star <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                          fontSize: '1.8rem',
                          marginRight: '5px',
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: primaryBlue,
                    borderColor: primaryBlue,
                    fontWeight: '600',
                  }}
                >
                  Submit Feedback
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-light text-center py-3 border-top" style={{ borderColor: primaryBlue }}>
        <small className="text-muted" style={{ color: primaryBlue }}>
          © 2025 Feedlytics. All rights reserved.
        </small>
      </footer>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />

      <style>{`

      .logout-btn:hover {
    background-color: ${primaryBlue} !important;
    color: white !important;
  }
        /* On md and up: make left column full viewport height, no border radius */
        @media(min-width: 768px) {
          .image-col {
            height: 100vh !important;
            border-radius: 0 !important;
          }
        }

        /* Center text vertically and horizontally */
        .image-col {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          
          /* Height for mobile */
          height: 200px;
        }

        /* Add horizontal padding on small screens */
        @media (max-width: 767.98px) {
          .image-col {
            padding-left: 2rem !important;
            padding-right: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}

export default FeedbackForm;