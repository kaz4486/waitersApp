import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../../redux/tablesRedux';
import { Container, Row } from 'react-bootstrap';

const Table = () => {
  const { tableId } = useParams();
  const tableData = useSelector((state) => getTableById(state, tableId));

  if (!tableData) return <Navigate to='/' />;

  return (
    <Container>
      <Row>
        <h3>Table {tableData.id}</h3>
      </Row>
      <Row>
        <h5 className='font-weight-bold'>Status: </h5>
        <p>{tableData.status}</p>
      </Row>
      <p>asdas</p>
    </Container>
  );
};
export default Table;
