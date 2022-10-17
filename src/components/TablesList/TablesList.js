import { Row, ListGroup, Col, Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../redux/tablesRedux';
import styles from './TablesList.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStatuses } from '../../redux/tablesRedux';
import { Alert } from 'react-bootstrap';
import { useEffect } from 'react';

const TablesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const status = useSelector(getStatuses);
  const tables = useSelector(getAllTables);

  if (status.loading) return <ProgressBar animated color='primary' now={50} />;
  if (status.error) return <Alert color='danger'>{status.error}</Alert>;
  if (!status.success || !tables.length)
    return <Alert color='info'>No tables</Alert>;
  if (status.success)
    return (
      <div>
        <ListGroup variant='flush'>
          {tables.map((table) => (
            <ListGroup.Item key={table.id} className='px-0'>
              <Row>
                <Col md={2}>
                  <h4>Table {table.id}</h4>
                </Col>
                <Col md={8} className='align-left'>
                  <p>
                    <span className={styles.bold}>Status: </span>
                    {table.status}
                  </p>
                </Col>
                <Col md={2}>
                  <Link to={'/table/' + table.id}>
                    <Button>Show more</Button>
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
};

TablesList.propTypes = {
  table: PropTypes.array,
};

export default TablesList;
