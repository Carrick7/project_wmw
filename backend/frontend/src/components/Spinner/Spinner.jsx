//CSS
import './Spinner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';

function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
      <FontAwesomeIcon icon={faGear} spin className='spinner_gear'/>
    </div>
  )
}

export default Spinner