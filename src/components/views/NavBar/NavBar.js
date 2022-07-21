import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='lg'
      className='justify-content-between rounded'
    >
      <NavbarBrand as={NavLink} to='/' className='mx-2'>
        Waiter.app
      </NavbarBrand>
      <Nav>
        <Nav.Link as={NavLink} to='/' className='mx-2'>
          Home
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
