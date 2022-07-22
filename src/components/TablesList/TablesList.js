import { Row, ListGroup, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import styles from './TablesList.module.scss';
import { Link } from 'react-router-dom';

const TablesList = () => {
  const tables = useSelector((state) => getAllTables(state));

  return (
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
              <Link key={table.id} to={'/table/' + table.id}>
                <Button>Show more</Button>
              </Link>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TablesList;
