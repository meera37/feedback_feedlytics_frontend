import { faComments, faCheckCircle, faChartLine, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Button, Navbar, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const primaryBlue = '#132855';

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

      <Container
        className="my-5"
        style={{ position: 'relative', paddingLeft: '15px', paddingRight: '15px' }} // added side padding for mobile & desktop
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src='img.jpg'
            //  src='https://t3.ftcdn.net/jpg/04/67/96/14/360_F_467961418_UnS1ZAwAqbvVVMKExxqUNi0MUFTEJI83.jpg'
            alt="Feedback Banner"
            style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '12px' }}
          />

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: '700',
              fontSize: '2.5rem',
              textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
              textAlign: 'center',
              padding: '0 10px',
              width: '90%',
              maxWidth: '800px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            className="overlay-text"
          >
            Feedlytics<br />
            <span style={{ fontWeight: '400', fontSize: '1.3rem', fontStyle: 'italic' }}>
              Transform feedback into insights.
            </span>
          </div>
        </div>
      </Container>

      <Container className="text-center my-5" style={{ maxWidth: '700px' }}>
        <Row
          className="mb-4 justify-content-center align-items-center"
          style={{ gap: '1rem', flexWrap: 'nowrap', overflowX: 'auto' }}
        >
          <Col xs="auto" className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faPenFancy} size="2x" style={{ color: primaryBlue }} />
            <p className="mt-2 mb-0">Easy Feedback Submission</p>
          </Col>
          <Col xs="auto" className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faChartLine} size="2x" style={{ color: primaryBlue }} />
            <p className="mt-2 mb-0">Real-time Sentiment Analysis</p>
          </Col>
          <Col xs="auto" className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{ color: primaryBlue }} />
            <p className="mt-2 mb-0">Actionable Insights</p>
          </Col>
        </Row>

        <hr style={{ maxWidth: '200px', margin: '1rem auto 2rem', borderColor: primaryBlue, opacity: 0.3 }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          <Button
            className="me-3 btn-login"
            size="lg"
            onClick={() => navigate('/auth?mode=login')}
            style={{ backgroundColor: primaryBlue, borderColor: primaryBlue, boxShadow: `0 4px 8px ${primaryBlue}80` }}
          >
            User Login
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => navigate('/auth?mode=register')}
            className="btn-register"
            style={{ color: primaryBlue, borderColor: primaryBlue, fontWeight: '600' }}
          >
            Register New Account
          </Button>
        </div>
      </Container>

      <footer className="bg-light text-center py-3 mt-5 border-top">
        <small className="text-muted">© 2025 Feedlytics. All rights reserved.</small>
      </footer>

      <style>{`
        @media (max-width: 576px) {
          .overlay-text {
            font-size: 1.8rem !important;
          }
          .overlay-text span {
            font-size: 1rem !important;
          }
          /* Stack icons vertically on mobile */
          .row {
            flex-wrap: wrap !important;
            overflow-x: visible !important;
          }
          .row > div {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            margin-bottom: 1rem;
          }
          /* Add consistent padding around the image container */
          .container.my-5 {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
        }
        /* Register button hover: fill with primaryBlue, text white */
        .btn-register:hover, .btn-register:focus {
          background-color: ${primaryBlue} !important;
          color: white !important;
          border-color: ${primaryBlue} !important;
          box-shadow: 0 0 10px ${primaryBlue}99;
        }
        /* Login button hover: darker bg, white text */
        .btn-login:hover, .btn-login:focus {
          background-color: #0f2545 !important; /* a darker shade */
          color: white !important;
          border-color: #0f2545 !important;
          box-shadow: 0 0 10px #0f254599;
        }
      `}</style>
    </>
  );
}

export default Home;


