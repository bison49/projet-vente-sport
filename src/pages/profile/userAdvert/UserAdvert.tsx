/* eslint-disable @typescript-eslint/no-explicit-any */
import './userAdvert.css';

import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { AiOutlineStar } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

import Footer from '../../../Component/footer/Footer';
import Header from '../../../Component/header/Header';
import useToken from '../../../utils/Auth/useToken';
import { getUserAdvert } from '../../../utils/axios_request';
import { capitalizeFirstLetter } from '../../../utils/helper/capitalizeFirstLetter';
import GetDate from '../../../utils/helper/GetDate';
import Time from '../../../utils/helper/Time';

function UserAdvert() {
  const { id } = useParams();
  const { token } = useToken();
  const [sellerArticle, setSellerArticle] = useState<any>();
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchSellerArticle() {
    if (id !== undefined) {
      await getUserAdvert(id, setSellerArticle, setIsLoading, setArticles);
    }
  }

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

  function addFavorite() {
    if (token) {
      confirmAlert({
        title: 'Favoris',
        message: 'Voulez vous ajouter cette annonce à vos favoris?',
        buttons: [
          {
            label: 'Ajouter',
            onClick: () => alert('Click Yes'),
          },
          {
            label: 'Annuler',
          },
        ],
      });
    } else {
      alert('Connectez-vous pour ajouter une annonce à vos favoris');
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchSellerArticle();

    return () => controller?.abort();
  }, []);

  return (
    <div className="user-advert-container">
      <Header />
      {!isLoading ? (
        <div className="user-advert-footer-wrapper">
          <div className="user-advert-wrapper">
            <div className="seller-advert-info-wrapper">
              <div className="seller-info-wrapper">
                <div className="seller-username">
                  <span>{sellerArticle.username}</span>
                </div>
                <div className="seller-creation-account-date">
                  Inscript depuis le : {GetDate(sellerArticle.userInfo.creationDate)}
                </div>
                <div className="seller-advert-count">
                  {sellerArticle.username} a actuellement{' '}
                  {sellerArticle.soldArticles.length} annonce(s) en ligne
                </div>
              </div>
            </div>
            <div className="seller-article-advert-wrapper">
              <div className="seller-box-articles">
                {articles.map(
                  (article, index) =>
                    !article.isSold && (
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
                                  {capitalizeFirstLetter(
                                    sellerArticle.userInfo.adress.city,
                                  )}{' '}
                                  {sellerArticle.userInfo.adress.postCode}
                                </div>
                                <div>
                                  {capitalizeFirstLetter(Time(article.dateForSale))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="favorite-card-icon">
                          <AiOutlineStar
                            title="Ajouter cette annonce à vos favoris"
                            className="favorite-icon"
                            size={'25px'}
                            onClick={() => addFavorite()}
                          />
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserAdvert;
