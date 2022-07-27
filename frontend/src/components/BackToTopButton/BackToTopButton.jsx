//CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import './BackToTopButton.css';

const BackToTopButton = () => {
  return (
    <div className="back_to_top_button_container">
     <a href='#back_to_top'><FontAwesomeIcon className="back_to_top_button" icon={faCircleArrowUp} bounce/></a>
    </div>
  )
}

export default BackToTopButton