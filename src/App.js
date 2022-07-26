import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Home from './components/views/pages/Home/Home';
import { fetchTables } from './redux/tablesRedux';
import Table from './components/views/pages/Table/Table';
import Footer from './components/views/Footer/Footer';
import { useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

const App = () => {
  const dispatch = useDispatch();

  const [pending, setPending] = useState(false);

  useEffect(() => dispatch(fetchTables(setPending)), [dispatch]);

  return (
    <main>
      <Container>
        <Header />
        {pending ? (
          <Spinner animation='border' />
        ) : (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/table/:id' element={<Table />} />
          </Routes>
        )}
        <Footer />
      </Container>
    </main>
  );
};

export default App;
