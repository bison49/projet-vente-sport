/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './articleDetails.css';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link, useParams } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Footer from '../../../Component/footer/Footer';
import Header from '../../../Component/header/Header';
import ImageSlider from '../../../Component/imageSilder/ImageSlider';
import useUser from '../../../utils/Auth/useUser';
import { getArticle } from '../../../utils/axios_request';
import Time from '../../../utils/helper/Time';

function ArticleDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [article, setArticle] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showTel, setShowTel] = useState<string>('N° de téléphone');
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [slide, setSlide] = useState<string>('');

  const customStyles = {
    content: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    },
    overlay: { zIndex: 1000 },
  };

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  injectStyle();

  async function fetchArticle() {
    if (id !== undefined) {
      await getArticle(setArticle, id, setIsLoading);
    }
  }

  function handleTel() {
    if (user) {
      setShowTel(
        article.seller.userInfo.phone
          ? article.seller.userInfo.phone
          : 'Aucun numéro pour ce vendeur',
      );
    } else {
      toast.info('Connectez-vous pour voir le numéro de téléphone de ce vendeur', {
        toastId: 'success4',
      });
    }
  }

  function handleModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchArticle();

    return () => controller?.abort();
  }, []);
  return (
    <div className="article-details-container">
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="modal-article-details-wrapper">
          <div className="modal-image-wrapper">
            <img
              className="modal-article-image"
              src={`${slide}`}
              alt="bien à vendre"
            ></img>
          </div>
          <div className="button-details-modal-wrapper">
            <button type="button" className="button-close-details" onClick={handleModal}>
              Fermer
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer
        position="top-center"
        theme="dark"
        transition={Slide}
        autoClose={false}
      />
      <Header />
      {!isLoading ? (
        <div className="article-details-wrapper">
          <div className="seller-message-wrapper">
            <Link
              to={`/user-advert/${article.seller.id}`}
              className="seller-username-link"
              title="Voir les annonces de ce vendeur"
            >
              Vendeur:
              <span className="name-seller-details"> {article.seller.username}</span>
            </Link>
            <Link
              to="/"
              className="send-message-seller-link"
              title="Envoyer un message au vendeur pour cette annonce"
            >
              <span>Envoyer un message</span>
            </Link>
            <button
              type="button"
              className="tel-seller-button"
              title="Voir le numéro de téléphone du vendeur"
              onClick={handleTel}
            >
              <span>{showTel}</span>
            </button>
          </div>
          <div className="article-details-info-wrapper">
            <div className="article-details-images-wrapper">
              <ImageSlider
                slides={article.images}
                setIsOpen={setIsOpen}
                setSlide={setSlide}
              />
            </div>
            <div className="article-info-wrapper">
              <div className="top-article-details-info">
                <h1 className="article-details-name">{article.name}</h1>
                <div className="date-article-details">
                  <span>Date d'ajout: {Time(article.dateForSale)}</span>
                </div>
              </div>
              <span>
                Prix de vente:{' '}
                <span className="article-details-price">{article.price}€</span>
              </span>
              <h2>Description:</h2>
              <p className="article-details-description">{article.description}</p>
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

export default ArticleDetails;
