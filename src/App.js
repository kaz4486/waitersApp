import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Home from './components/views/pages/Home/Home';
import { fetchTables } from './redux/tablesRedux';
import Table from './components/views/pages/Table/Table';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table/:id' element={<Table />} />
        </Routes>
      </Container>
    </main>
  );
};

export default App;
