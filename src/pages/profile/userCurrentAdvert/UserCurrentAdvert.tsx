/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './userCurrentAdvert.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../../../Component/footer/Footer';
import Header from '../../../Component/header/Header';
import useToken from '../../../utils/Auth/useToken';
import useUser from '../../../utils/Auth/useUser';
import { deleteArticle, getUserProfilAdvert } from '../../../utils/axios_request';
import { capitalizeFirstLetter } from '../../../utils/helper/capitalizeFirstLetter';
import Time from '../../../utils/helper/Time';

function UserCurrentAdvert() {
  const { user } = useUser();
  const { token } = useToken();
  const id = user.id;
  const navigate = useNavigate();
  const [articleDelete, setArticleDelete] = useState<boolean>(false);
  const url = `api/articles?page=1&seller.id=${id}&isSold=false`;
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const noListMessage = "Vous n'avez pas d'annonces en ligne actuellement.";

  async function fetchSellerArticle() {
    if (id !== undefined) {
      await getUserProfilAdvert(id, url, setIsLoading, setArticles);
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

  async function handleDelete(id: number) {
    confirmAlert({
      title: 'Supprimer une annonce',
      message: 'Voulez-vous vraiment supprimer cette annonce?',
      buttons: [
        {
          label: 'Supprimer',
          onClick: async () => {
            await deleteArticle(id, token, setArticleDelete);
          },
        },
        {
          label: 'Annuler',
        },
      ],
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchSellerArticle();
    setArticleDelete(false);
    return () => controller?.abort();
  }, [articleDelete]);

  return (
    <div className="user-advert-container">
      <Header />
      {!isLoading ? (
        <div className="user-advert-footer-wrapper">
          <div className="user-advert-wrapper">
            <div className="my-advert-profil-wrapper">
              <div className="my-advert-box-articles">
                <div>
                  <h1>Vos annonces actuellement en ligne: </h1>
                </div>
                {articles.length === 0 && (
                  <p style={{ fontSize: '24px' }}>{noListMessage}</p>
                )}
                {articles.map((article, index) => (
                  <div key={index} className="profil-my-advert-card">
                    <div className="seller-article-card">
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
                                  article.seller.userInfo.adress.city,
                                )}{' '}
                                {article.seller.userInfo.adress.postCode}
                              </div>
                              <div>
                                {capitalizeFirstLetter(Time(article.dateForSale))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="button-advert-card">
                      <div className="my-advert-button-wrapper">
                        <button
                          type="button"
                          className="my-advert-update-button"
                          onClick={() =>
                            navigate('/update-article', { state: { article: article } })
                          }
                        >
                          Modifier
                        </button>
                      </div>
                      <div className="my-advert-button-wrapper">
                        <button
                          type="button"
                          className="my-advert-delete-button"
                          onClick={() => handleDelete(article.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

export default UserCurrentAdvert;
