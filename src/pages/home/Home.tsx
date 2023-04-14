/* eslint-disable @typescript-eslint/no-explicit-any */
import './home.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-range-slider-input/dist/style.css';

import { SetStateAction, useEffect, useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi';
import RangeSlider from 'react-range-slider-input';
import { Link } from 'react-router-dom';

import Footer from '../../Component/footer/Footer';
import Header from '../../Component/header/Header';
import { getArticles, getCategories, getVicopoCities } from '../../utils/axios_request';
import useFavorite from '../../utils/Favorite/useFavorite';
import { capitalizeFirstLetter } from '../../utils/helper/capitalizeFirstLetter';
import Time from '../../utils/helper/Time';
import Pagination from '../../utils/pagination/Pagination';

function Home() {
  const [favorites, handleFavorites] = useFavorite();
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<string>('/api/articles?page=1&isSold=false');
  const [hydra, setHydra] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [value, setValue] = useState([0, 1000]);
  const [categoryName, setCategorieName] = useState<string>('');
  const [cities, setCities] = useState<any[]>([]);
  let search: SetStateAction<string>;

  const [values, setValues] = useState<any>({
    articleName: '',
    city: '',
    sorting: '',
    postCode: '',
    category: '',
  });

  async function fetchArticles(p: string) {
    await getArticles(p, setArticles, setHydra, setTotalPages, setValue);
    setCategorieName(values.category);
    setIsLoading(false);
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

  function handleFavorite(article: any) {
    handleFavorites(article);
  }

  const onChange = async (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === 'city' || e.target.name === 'postCode') {
      if (e.target.value.length > 2) {
        await getVicopoCities(setCities, e.target.value);
        const opts = (document.getElementById('cities') as HTMLElement).children;
        if (opts !== undefined) {
          for (const opt of opts) {
            if (opt instanceof HTMLElement) {
              if (opt.textContent === e.target.value) {
                setValues({
                  ...values,
                  ['city']: opt.dataset.city,
                  ['postCode']: opt.dataset.code,
                });
                break;
              }
            }
          }
        }
      }
      if (e.target.value.length < 3) {
        setCities([]);
      }
    }
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search = '/api/articles?page=1&isSold=false';
    if (values.articleName !== '') {
      search = search + `&name=${values.articleName}`;
    }
    if (value[0] !== 0 || value[1] !== 1000) {
      search = search + `&price[between]=${value[0]}..${value[1]}`;
    }
    if (values.category !== '') {
      search = search + `&categorie.name=${values.category}`;
    }
    if (values.city !== '') {
      search = search + `&seller.userInfo.adress.city=${values.city}`;
    }
    if (values.postCode !== '') {
      search = search + `&seller.userInfo.adress.postCode=${values.postCode}`;
    }
    setPage(search);
  };

  useEffect(() => {
    if (values.sorting !== '') {
      let order = search !== undefined ? search : '/api/articles?page=1&isSold=false';
      order = order + `&order${values.sorting}`;
      setPage(order);
    }
  }, [values.sorting]);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(setCategories);
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetchArticles(page);
    return () => controller?.abort();
  }, [page]);

  return (
    <div className="home-container">
      <Header />
      <div className="home-content-wrapper">
        <form
          className="search-wrapper"
          autoComplete="off"
          noValidate
          onSubmit={handleFilter}
        >
          <div className="top-search-wrapper">
            <div className="search-article-input home-article-input">
              <input
                type={'text'}
                name="articleName"
                className="input-search input-home"
                placeholder="L'objet que vous recherchez"
                onChange={onChange}
              />
              <HiOutlineSearch className="search-icon" size={'20px'} />
            </div>
            <div className="search-city-input home-article-input">
              <input
                list="cities"
                id="ville"
                name="city"
                className="input-search-city input-home"
                placeholder="La ville où vous recherchez"
                onChange={onChange}
                value={values.city}
              />
            </div>
            <datalist id="cities">
              {cities.length > 0 &&
                cities.slice(0, 8).map((element, index) => (
                  <option key={index} data-city={element.city} data-code={element.code}>
                    {element.city} - {element.code}
                  </option>
                ))}
            </datalist>

            <div className="search-postCode-input home-article-input">
              <input
                type={'text'}
                list="cities"
                id="code"
                name="postCode"
                className="input-search-city input-home"
                placeholder="Code postal"
                onChange={onChange}
                value={values.postCode}
              />
            </div>
          </div>
          <div className="bottom-search-wrapper">
            <div className="category-search-wrapper home-article-input">
              <select
                className="category-home-search input-home"
                name="category"
                onChange={onChange}
                defaultValue="default"
              >
                <option value="default" disabled hidden>
                  Catégories
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
                <option value={''}>Tous les articles</option>;
              </select>
            </div>
            <div className="price-search-wrapper">
              <div className="price-output">
                <output className="price-output-value">{value[0]} €</output>
              </div>
              <RangeSlider
                className="range-slider"
                value={value}
                onInput={setValue}
                max={1000}
                step={10}
              />
              <div className="price-output">
                <output className="price-output-value">{value[1]} €</output>
              </div>
            </div>
            <div className="submit-search">
              <button type="submit" className="submit-search-button">
                <span>Rechercher</span>
              </button>
            </div>
          </div>
        </form>
        <div className="sorting-wrapper">
          {categoryName !== '' && (
            <div className="advert-name">
              <h1>Annonces dans la catégorie: {categoryName} </h1>
            </div>
          )}
          <div className="sorting-advert home-article-input">
            <select
              className="sorting-advert-select input-home"
              name="sorting"
              onChange={onChange}
              defaultValue={'[dateForSale]=desc'}
            >
              <option value={'[dateForSale]=desc'}>Trier par: plus récentes</option>
              <option value={'[dateForSale]=asc'}>Trier par: plus anciennes</option>
              <option value={'[price]=asc'}>Trier par: prix croissant</option>
              <option value={'[price]=desc'}>Trier par: prix décroissant</option>
            </select>
          </div>
        </div>
        {!isLoading ? (
          <div className="article-wrapper">
            <div className="box-articles">
              {articles.map((article, index) => {
                const isFavorite = favorites.some((item: any) => item.id === article.id);
                return (
                  <div className="article-card" key={index}>
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
            <div className="bottom-home-page">
              <div className="pagination-wrapper">
                {Pagination(
                  setPage,
                  setCurrentPage,
                  hydra,
                  currentPage,
                  totalPages,
                  page,
                )}
              </div>
              <Footer />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
