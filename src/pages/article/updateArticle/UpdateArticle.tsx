/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './updateArticle.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Banner from '../../../Component/banner/Banner';
import useToken from '../../../utils/Auth/useToken';
import { getCategories, updateArticle } from '../../../utils/axios_request';
import { formArticleValidation } from '../../../utils/form/formValidation';

function UpdateArticle() {
  const { state } = useLocation();
  const { article } = state;
  const { token } = useToken();
  const title = 'Modifier une annonce';
  const navigate = useNavigate();
  //const [images, setImages] = useState<any>([]);
  const [count, setCount] = useState(article.description.length);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [values, setValues] = useState<any>({
    name: article.name,
    description: article.description,
    price: article.price,
    category: article.categorie['@id'],
    images: article.images,
  });
  const [errorMessages, setErrorMessages] = useState<any>({
    name: '',
    description: '',
    price: '',
    category: '',
    images: '',
  });

  injectStyle();

  useEffect(() => {
    if (isValidate) {
      toast.success(message, {
        toastId: 'success1',
      });
      setTimeout(() => {
        navigate('/my-adverts');
      }, 2000);
    }
  }, [isValidate]);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(setCategories);
    return () => controller?.abort();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ''));
    setErrorMessages({ ...errorMessages });
    if (formArticleValidation(values, setErrorMessages, errorMessages, values.images)) {
      await updateArticle(
        article.id,
        {
          name: values.name,
          description: values.description,
          price: parseInt(values.price),
          categorie: values.category,
        },
        setMessage,
        token,
        setIsValidate,
      );
    }
  };

  function onChange(e: any) {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === 'description') {
      setCount(e.target.value.length);
    }
  }

  return (
    <div className="update-article-container">
      <ToastContainer position="top-center" transition={Slide} autoClose={false} />
      <Banner title={title} />
      <div className="update-article-wrapper">
        <form
          className="update-article-inputs-wrapper"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="update-article-form-input">
            <label htmlFor={'name'}>
              <span className="label-custom-style">
                Nom de l'article
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="input-div-update-article name">
              <input
                className="update-article-input"
                type={'text'}
                name={'name'}
                value={values.name}
                onChange={onChange}
                required
              />
            </div>
            <span className="error">{errorMessages.name}</span>
          </div>
          <div className="update-article-form-input">
            <label htmlFor={'description'}>
              <span className="label-custom-style">
                Description de l'article({count}/1000)
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="textarea-update-article within">
              <textarea
                className="update-article-input"
                maxLength={1000}
                rows={10}
                name={'description'}
                value={values.description}
                onInput={onChange}
                required
              />
            </div>
            <span className="error">{errorMessages.description}</span>
          </div>

          <div className="update-article-form-input">
            <label htmlFor={'price'}>
              <span className="label-custom-style">
                Prix
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="input-div-update-article price">
              <input
                className="update-article-input"
                type={'text'}
                name={'price'}
                min={0}
                value={values.price}
                onChange={onChange}
                required
              />
              <span style={{ padding: '0 5px 0 0' }}>€</span>
            </div>
            <span className="error">{errorMessages.price}</span>
          </div>

          <div className="update-article-form-input">
            <label htmlFor={'category'}>
              <span className="label-custom-style">
                Catégorie
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="input-div-update-article category within">
              <select
                className="update-article-input"
                name="category"
                onChange={onChange}
                value={values.category}
                required
              >
                <option value="default" disabled hidden>
                  Sélectionnez une catégorie
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category['@id']}>
                    {category.name}
                  </option>
                ))}
                ;
              </select>
            </div>
            <span className="error">{errorMessages.category}</span>
          </div>
          <div className="submit-button-update-article">
            <button type="submit">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateArticle;
