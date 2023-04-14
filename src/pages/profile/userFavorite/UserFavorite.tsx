/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './userFavorite.css';

import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Footer from '../../../Component/footer/Footer';
import Header from '../../../Component/header/Header';
import useFavorite from '../../../utils/Favorite/useFavorite';
import { capitalizeFirstLetter } from '../../../utils/helper/capitalizeFirstLetter';
import Time from '../../../utils/helper/Time';

function UserFavorite() {
  const [favorites, handleFavorites] = useFavorite();
  const noListMessage =
    "Vous n'avez pas encore enregistré(e) d'annonces dans vos favoris.";
  function displayImage(images: any[]) {
    let image = '';
    if (images.length === 0) {
      image = '../../../resources/images/photo_articles/ballon.jpeg';
    } else {
      images.forEach((element, index) => {
        if (index === 0) {
          image = `http://localhost:8000/uploads/users/articles/${element.uri}`;
          return image;
        }
      });
    }
    return image;
  }

  function handleFavorite(article: any) {
    handleFavorites(article);
  }

  return (
    <div className="user-advert-container">
      <Header />

      <div className="user-advert-footer-wrapper">
        <div className="user-advert-wrapper">
          <div className="seller-article-advert-wrapper">
            <div className="seller-box-articles">
              <div>
                <h1>Vos annonces favorites: </h1>
              </div>

              {favorites.length === 0 && (
                <p style={{ fontSize: '24px' }}>{noListMessage}</p>
              )}
              {favorites.map((article: any, index: number) => {
                const isFavorite = favorites.some((item: any) => item.id === article.id);
                return (
                  <div className="seller-article-card" key={index}>
                    <Link
                      title="Voir le détail de cette annonce"
                      className="link-card"
                      to={`/article/${article.id}`}
                    >
                      <div className="image-article">
                        <img
                          className="photo-article"
                          src={displayImage(article.images)}
                          alt={`${article.name}`}
                          loading="lazy"
                        />
                      </div>

                      <div className="search-info-article">
                        <div className="top-article-info">
                          <span className="article-name">
                            {capitalizeFirstLetter(article.name)}
                          </span>
                          <span className="article-price">{article.price} €</span>
                        </div>
                        <div className="bottom-article-info">
                          <div className="info-bottom-card">
                            <div>{capitalizeFirstLetter(article.categorie.name)}</div>
                            <div>
                              {capitalizeFirstLetter(article.seller.userInfo.adress.city)}{' '}
                              {article.seller.userInfo.adress.postCode}
                            </div>
                            <div>{capitalizeFirstLetter(Time(article.dateForSale))}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="favorite-card-icon">
                      <AiOutlineStar
                        strokeWidth={'4'}
                        fill={isFavorite ? 'red' : undefined}
                        title={
                          isFavorite
                            ? 'Retirer cette annonce de vos favoris'
                            : 'Ajouter cette annonce à vos favoris'
                        }
                        className={'favorite-icon'}
                        size={'25px'}
                        onClick={() => handleFavorite(article)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default UserFavorite;
