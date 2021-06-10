import React, {useState, useEffect} from 'react';
import ModalViewComponent from './ModalViewComponent';


const HeartButton = (props) => {
  const [modalView, setModalView] = useState(false);

  useEffect(() => {
    setModalView(false);
  }, [props.currentChar]);

  const handleClick = () => {
    setModalView(!modalView);
  };

  return (
    <div>
      {modalView ? <ModalViewComponent currentName={props.currentName} currentChar={props.currentChar} relatedName={props.relatedName} relatedChar={props.relatedChar}/> : null}
      <button onClick={handleClick}></button>
    </div>
  );
};

export default HeartButton;
