//css
import './NotFound.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container fluid className='centre_my_skull'>
      <span>
        <FontAwesomeIcon icon={faSkullCrossbones} className="skull_bones" flip/>
      </span>
      <br /><br />
      <span className='skull_text'> No Lists/Products Found </span>
    </Container>
  )
}

export default NotFound