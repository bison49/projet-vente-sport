/* eslint-disable react/no-unescaped-entities */
import './header.css';

import { FaUserAlt } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { MdAppRegistration } from 'react-icons/md';
import { RiShutDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import logo from '../../../resources/images/logo/logo.svg';
import useToken, { removeToken } from '../../utils/Auth/useToken';
import useUser from '../../utils/Auth/useUser';
import { modifUser } from '../../utils/axios_request';

function Header() {
  const { token } = useToken();
  const { user } = useUser();

  async function handlelogout() {
    await modifUser(user.id, { userInfo: { lastConnectionDate: new Date() } }, token);
    removeToken();
    window.history.pushState(null, '', '/');
    location.reload();
  }
  return (
    <div className="App-header">
      <div className="logo-wrapper">
        <Link to="/">
          <img src={logo} className="logo" alt="logo de l'entreprise sposirte" />
        </Link>
      </div>
      <div className="right-header-wrapper">
        <div className="add_ad_wrapper">
          <Link to="/add-article" className="header-link">
            <button type="button" className="add_ad_button">
              <div className="add_icon">
                <IoIosAddCircle size="30px" />
              </div>
              <div className="add-button-text">Déposer une annonce</div>
            </button>
          </Link>
        </div>
        <div className="auth-wrapper">
          <div className="auth-signin-wrapper">
            {!token ? (
              <Link to="/login" className="header-link">
                <button type="button" className="signin auth">
                  <FaUserAlt size="25px" />
                  <div className="button_text">Se connecter</div>
                </button>
              </Link>
            ) : (
              <Link to="/Profile" className="header-link">
                <button type="button" className="signin auth profile">
                  <FaUserAlt size="25px" />
                  <div className="button_text">{user.username}</div>
                </button>
              </Link>
            )}
          </div>
          <div className="auth-register-wrapper">
            {!token ? (
              <Link to="/register" className="header-link">
                <button type="button" className="register auth">
                  <MdAppRegistration size="25px" />
                  <div className="button_text">S'inscrire</div>
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="register auth logout"
                onClick={handlelogout}
              >
                <RiShutDownLine size="25px" />
                <div className="button_text">Déconnexion</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
