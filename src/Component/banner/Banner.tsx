/* eslint-disable @typescript-eslint/no-explicit-any */
import './banner.css';

import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../resources/images/logo/logo.svg';

function Banner(_props: any) {
  const navigate = useNavigate();

  const title = _props.title;

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="App-banner">
      <div className="back-wrapper">
        <button onClick={handleBack} type="button" className="back-button">
          <BiArrowBack className="back-arrow" size="30px" />
        </button>
      </div>
      <div className="logo-banner-wrapper">
        <Link to="/">
          <img src={logo} className="banner-logo" alt="logo de l'entreprise sposirte" />
        </Link>
      </div>
      <span className="vertical-line"></span>
      <div className="banner-title-wrapper">
        <span>{title}</span>
      </div>
    </div>
  );
}
export default Banner;
