import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById, patchTable } from '../../../../redux/tablesRedux';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import styles from './Table.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Table = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [people, setPeople] = useState(tableData.people);
  const [maxPeople, setMaxPeople] = useState(tableData.maxPeople);
  const [bill, setBill] = useState(tableData.bill);
  const [status, setStatus] = useState(tableData.status);

  let table = { people, maxPeople, bill, status };

  // useEffect(() => dispatch(patchTable()), []);

  const handleSubmit = (e) => {
    dispatch(patchTable(id, table));
    navigate('/');
  };

  if (!tableData) return <Navigate to='/' />;
  else
    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className='my-3'>
            <h2>Table {tableData.id}</h2>
          </Row>
          <Row className='mb-3 align-items-center'>
            <Col xs={12} sm={2} md={1}>
              <h6 className='font-weight-bold'>Status: </h6>
            </Col>
            <Col xs={4}>
              <Form.Select
                aria-label='Select status'
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>{status}</option>
                <option value='Busy'>Busy</option>
                <option value='Reserved'>Reserved</option>
                <option value='Free'>Free</option>
                <option value='Cleaning'>Cleaning</option>
              </Form.Select>
            </Col>
          </Row>

          <Form.Group controlId='peopleAmount'>
            <Row className='align-items-center mb-3'>
              <Col xs={12} sm={2} md={1}>
                <Form.Label>
                  <h6 className='font-weight-bold'>People: </h6>
                </Form.Label>
              </Col>
              <Col xs={6} md={4} xl={2}>
                <Row className='align-items-center'>
                  <Col xs={5} md={4} xl={5} className='align-center'>
                    <Form.Control
                      type='number'
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                    />
                  </Col>
                  <Col xs={1}>
                    <span className={styles.shortSpan}>/</span>
                  </Col>
                  <Col xs={5} md={4} xl={5}>
                    <Form.Control
                      type='number'
                      value={maxPeople}
                      onChange={(e) => setMaxPeople(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='bill'>
            <Row className='align-items-center'>
              <Col xs={12} sm={2} md={1}>
                <Form.Label>
                  <h6 className='font-weight-bold '>Bill: </h6>
                </Form.Label>
              </Col>
              <Col xs={6} md={4} xl={2}>
                <Row className='align-items-center'>
                  <Col xs={1}>
                    <span className={styles.shortSpan}>$</span>
                  </Col>
                  <Col xs={6} sm={5} xl={6}>
                    <Form.Control
                      type='number'
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-3'>
            Update
          </Button>
        </Form>
      </Container>
    );
};
export default Table;
