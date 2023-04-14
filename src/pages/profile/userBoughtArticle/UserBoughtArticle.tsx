/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './userBoughtArticle.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../../Component/footer/Footer';
import Header from '../../../Component/header/Header';
import useUser from '../../../utils/Auth/useUser';
import { getUserProfilAdvert } from '../../../utils/axios_request';
import { capitalizeFirstLetter } from '../../../utils/helper/capitalizeFirstLetter';
import { substractYears, subtractMonths } from '../../../utils/helper/GetDate';
import Time from '../../../utils/helper/Time';

function UserBoughtArticle() {
  const { user } = useUser();
  const id = user.id;
  const [url, setUrl] = useState(`api/articles?page=1&buyer.id=${id}&isSold=true`);
  const [articles, setArticles] = useState<any[]>([]);
  const today = new Date();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noListMessage, setNoListMessage] = useState<string>(
    "Vous n'avez pas encore acheté(e) de biens sur notre site.",
  );

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

  function onChange(e: { target: { value: any } }) {
    setUrl(`api/articles?page=1&buyer.id=${id}&isSold=true${e.target.value}`);
    setNoListMessage("Vous n'avez pas acheté de biens durant cette période");
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchSellerArticle();

    return () => controller?.abort();
  }, [url]);

  return (
    <div className="user-advert-container">
      <Header />
      {!isLoading ? (
        <div className="user-advert-footer-wrapper">
          <div className="user-advert-wrapper">
            <div className="seller-article-advert-wrapper">
              <div className="seller-box-articles">
                <div>
                  <h1>Vos achats: </h1>
                  <div className="sorting-advert-profil home-article-input">
                    <select
                      className="sorting-advert-select input-home"
                      name="sorting"
                      onChange={onChange}
                      defaultValue={''}
                    >
                      <option value={''}>Tous vos achats</option>
                      <option
                        value={`&dateSold[after]=${subtractMonths(today, 1)
                          .toISOString()
                          .slice(0, 10)}`}
                      >
                        Il y a moins de 1 mois
                      </option>
                      <option
                        value={`&dateSold[after]=${subtractMonths(today, 3)
                          .toISOString()
                          .slice(0, 10)}`}
                      >
                        Il y a moins de 3 mois
                      </option>
                      <option
                        value={`&dateSold[after]=${subtractMonths(today, 6)
                          .toISOString()
                          .slice(0, 10)}`}
                      >
                        Il y a moins de 6 mois
                      </option>
                      <option
                        value={`&dateSold[after]=${substractYears(today, 1)
                          .toISOString()
                          .slice(0, 10)}`}
                      >
                        Il y a moins de 1 an
                      </option>
                    </select>
                  </div>
                </div>

                {articles.length === 0 && (
                  <p style={{ fontSize: '24px' }}>{noListMessage}</p>
                )}
                {articles.map((article, index) => (
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

export default UserBoughtArticle;
