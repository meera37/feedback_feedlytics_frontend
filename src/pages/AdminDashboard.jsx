import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Navbar, Nav } from 'react-bootstrap';
import { getAllFeedbackApi } from '../services/allApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const primaryBlue = '#132855';
const lightBlue = '#3b5998';
const lighterBlue = '#d4e1f5';

const emotionColors = {
  Happy: '#4caf50',
  Neutral: '#607d8b',
  Sad: '#2196f3',
  Angry: '#f44336',
  Surprise: '#9c27b0',
  Fear: '#795548',
};

function AdminDashboard({ onLogout }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await getAllFeedbackApi();
        if (response && response.data) {
          setFeedbacks(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeedbacks();
  }, []);

  if (loading) return <div className="text-center mt-5" style={{ color: primaryBlue }}>Loading...</div>;

  const total = feedbacks.length;
  const emotionCounts = feedbacks.reduce((acc, fb) => {
    acc[fb.emotion] = (acc[fb.emotion] || 0) + 1;
    return acc;
  }, {});

  const emotionsToShow = ['Happy', 'Neutral', 'Sad', 'Angry'];

  const handleLogout = () => {
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

      <Container fluid className="py-4" style={{ backgroundColor: lighterBlue, minHeight: 'calc(100vh - 120px)' }}>
        <Row className="mb-4 justify-content-center">
          <Col xs={12} md={10}>
            <h2 style={{ color: primaryBlue, fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Dashboard</h2>

            <Row className="g-3 justify-content-center mb-4">


              {emotionsToShow.map(emotion => (
                <Col xs={10} sm={6} md={3} key={emotion}>
                  <Card style={{ backgroundColor: emotionColors[emotion], color: 'white' }} className="text-center shadow-sm p-3">
                    <Card.Title style={{ fontWeight: '700', fontSize: '1.2rem' }}>{emotion}</Card.Title>
                    <Card.Text style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>
                      {emotionCounts[emotion] || 0}
                    </Card.Text>
                  </Card>
                </Col>
              ))}

              <Col xs={10} sm={6} md={3}>
                <Card style={{ backgroundColor: primaryBlue, color: 'white' }} className="text-center shadow-sm p-3">
                  <Card.Title style={{ fontWeight: '700', fontSize: '1.2rem' }}>Total Feedback</Card.Title>
                  <Card.Text style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>{total}</Card.Text>
                </Card>
              </Col>
            </Row>

            <hr className="my-4" />

            <h4 style={{ color: primaryBlue, fontWeight: '600', marginBottom: '1rem' }}>User Feedbacks</h4>

            <Table
              striped
              bordered
              hover
              responsive
              className="shadow-sm"
              style={{ backgroundColor: 'white' }}
            >
              <thead style={{ backgroundColor: primaryBlue, color: 'white' }}>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th style={{ textAlign: 'center' }}>Emotion</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">No feedbacks found.</td>
                  </tr>
                )}
                {feedbacks.map((fb, idx) => (
                  <tr key={fb._id || idx}>
                    <td>{idx + 1}</td>
                    <td>{fb.user?.username || fb.user?.email || 'Anonymous'}</td>
                    <td>{fb.rating}</td>
                    <td>{fb.comment}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Badge
                        style={{
                          backgroundColor: emotionColors[fb.emotion] || primaryBlue,
                          color: 'white',
                          padding: '0.4em 0.75em',
                          fontWeight: '600',
                          borderRadius: '12px',
                          display: 'inline-block',
                          minWidth: '70px',
                          textAlign: 'center',
                        }}
                      >
                        {fb.emotion}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <footer className="bg-light text-center py-3 border-top" style={{ borderColor: primaryBlue }}>
        <small className="text-muted" style={{ color: primaryBlue }}>
          © 2025 Feedlytics. All rights reserved.
        </small>
      </footer>

      <style>{`
        .logout-btn:hover {
          background-color: ${primaryBlue} !important;
          color: white !important;
        }
      `}</style>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />

    </>
  );
}

export default AdminDashboard;

