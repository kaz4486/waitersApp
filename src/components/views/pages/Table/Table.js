import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  fetchTables,
  getAllTables,
  getStatuses,
  getTableById,
  patchTable,
} from '../../../../redux/tablesRedux';
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  ProgressBar,
  Alert,
} from 'react-bootstrap';
import styles from './Table.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import appointedStatuses from '../../../../config/statuses';
import PropTypes from 'prop-types';

const Table = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTables());
  // }, [dispatch]);

  const request = useSelector(getStatuses);
  console.log(request);
  const tables = useSelector(getAllTables);
  console.log(tables);
  const tableData = useSelector((state) => getTableById(state, id));
  console.log(tableData);

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const [people, setPeople] = useState(tableData.people);
  const [maxPeople, setMaxPeople] = useState(tableData.maxPeople);
  const [bill, setBill] = useState(tableData.bill);
  const [status, setStatus] = useState(tableData.status);

  const [show, setShow] = useState(status === 'Busy');

  const handleSubmit = (e) => {
    let table = { people, maxPeople, bill, status };
    dispatch(patchTable(id, table));
    navigate('/');
  };

  let filteredStatuses = [];
  const getFilteredStatuses = (status) => {
    filteredStatuses = appointedStatuses.filter(
      (appointedStatus) => appointedStatus !== status
    );
  };
  getFilteredStatuses(status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    getFilteredStatuses(status);
    if (e.target.value === 'Cleaning' || e.target.value === 'Free') {
      setPeople(0);
      setShow(false);
    } else if (e.target.value !== 'Busy') {
      setBill(0);
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handlePeopleChange = (e) => {
    const parsedValue = parseInt(e.target.value);
    if (parsedValue >= 0 && parsedValue <= maxPeople) {
      setPeople(parsedValue);
    }
  };

  const handleMaxPeopleChange = (e) => {
    const parsedValue = parseInt(e.target.value);
    if (parsedValue >= 0 && parsedValue <= 10) {
      setMaxPeople(parsedValue);
    }
    if (parsedValue < people) {
      setPeople(parsedValue);
    }
  };

  const handleBill = (e) => {
    if (e.target.value >= 0) {
      setBill(e.target.value);
    }
  };

  if (request.loading) return <ProgressBar animated color='primary' now={50} />;
  if (request.error) return <Alert color='danger'>{request.error}</Alert>;
  if (!request.success || !tableData) return <Navigate to='/' />;
  if (request.success)
    return (
      <Container>
        <Form onSubmit={validate(handleSubmit)}>
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
                onChange={handleStatusChange}
              >
                <option>{status}</option>
                {filteredStatuses.map((filteredStatus) => (
                  <option value={filteredStatus} key={filteredStatus}>
                    {filteredStatus}
                  </option>
                ))}
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
                      {...register('people', { min: 0, max: maxPeople })}
                      type='number'
                      value={people}
                      onChange={handlePeopleChange}
                    />
                    {errors.people && (
                      <small className='d-block form-text text-danger mt-2'>
                        minimum value is 0 and you can't put more than maximum
                        people
                      </small>
                    )}
                  </Col>
                  <Col xs={1}>
                    <span className={styles.shortSpan}>/</span>
                  </Col>
                  <Col xs={5} md={4} xl={5}>
                    <Form.Control
                      type='number'
                      value={maxPeople}
                      onChange={handleMaxPeopleChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>

          {show && (
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
                        onChange={handleBill}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          )}

          <Button variant='primary' type='submit' className='mt-3'>
            Update
          </Button>
        </Form>
      </Container>
    );
};

Table.propTypes = {
  getTableById: PropTypes.string,
  patchTable: PropTypes.func,
  tableData: PropTypes.array,
  filteredStatuses: PropTypes.array,
};

export default Table;
