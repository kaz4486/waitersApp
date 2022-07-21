import TablesList from '../../../TablesList/TablesList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <h1 className='my-3'>All tables</h1>
      <TablesList />
    </Container>
  );
};

export default Home;
