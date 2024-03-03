

import React, { useContext } from 'react';
import { Container, Navbar, Nav, Collapse, Button } from 'react-bootstrap';
import Logo from '../images/abc-high-resolution-logo-transparent.png';
import { isAuthTokenContext } from '../Context/ContextShare';
import { useNavigate } from 'react-router-dom';

function Adheader({ adhome }) {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('existingUser');
    setIsAuthToken(false);
    navigate('/adlogin');
  };

  const [open, setOpen] = React.useState(false);

  return (
      <div
        className=" "
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container >
            
              <img className="ms-0" style={{ width: '60px' }} src={Logo} alt="no image" />
            
          
            <h2 className='text-center text-dark fw-bold '>ADMIN</h2>
            <Button onClick={handleLogout} className="btn btn-success rounded">
              LOGOUT
            </Button>
          </Container>
        </Navbar>
      </div>
  
  );
}

export default Adheader;