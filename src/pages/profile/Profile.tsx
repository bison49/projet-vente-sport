import './profile.css';

import { Link } from 'react-router-dom';

import Footer from '../../Component/footer/Footer';
import Header from '../../Component/header/Header';
import useUser from '../../utils/Auth/useUser';
import GetDate, { GetLongDate } from '../../utils/helper/GetDate';
import { MenuContent } from '../../utils/menuProfilContent/MenuContent';

/* eslint-disable react/no-unescaped-entities */
function Profile() {
  const { user } = useUser();
  return (
    <div className="profile-user-container">
      <Header />
      <div className="profile-user-wrapper">
        <div className="menu-profile-user-wrapper">
          <div className="menu-item-wrapper">
            {MenuContent.map((content, index) => (
              <div key={index} className="content-menu-box">
                <Link to={content.path} className="menu-content-link">
                  <div className="content-name-wrapper">
                    <span>{content.name}</span>
                  </div>
                  <div className="content-description-wrapper">
                    <span>{content.description}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="profil-item-wrapper">
            <div className="user-profil-box">
              <div className="profil-username-wrapper">
                <span>
                  {user.username}{' '}
                  <span style={{ fontStyle: 'italic', fontSize: '16px', color: 'grey' }}>
                    (né(e) le: {GetLongDate(user.userInfo.birthdate)})
                  </span>
                </span>
              </div>
              <div className="profil-date-wrapper">
                <div>
                  Vous êtes inscript depuis le: {GetDate(user.userInfo.creationDate)}
                </div>
                <div>Dernière visite le: {GetDate(user.userInfo.lastConnectionDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
export default Profile;
