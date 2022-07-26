import PropTypes from 'prop-types';
import NavBar from '../NavBar/NavBar';

const Header = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

Header.propTypes = {
  NavBar: PropTypes.func,
};

export default Header;
