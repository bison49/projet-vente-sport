/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './addArticle.css';

import { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { IoMdRemoveCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Banner from '../../../Component/banner/Banner';
import useToken from '../../../utils/Auth/useToken';
import useUser from '../../../utils/Auth/useUser';
import { addArticle, getCategories } from '../../../utils/axios_request';
import { formArticleValidation } from '../../../utils/form/formValidation';
import { article } from '../../../utils/object/article';

function AddArticle() {
  const title = 'Ajouter un article';
  const navigate = useNavigate();
  const { token } = useToken();
  const MAX_COUNT = 3;
  const MAX_FILE_SIZE = 1024 * 1024 * 2;
  const { user } = useUser();
  const [images, setImages] = useState<any>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [fileFull, setIsFull] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [fileNumber, setFileNumber] = useState<number>(0);
  injectStyle();

  useEffect(() => {
    const controller = new AbortController();
    getCategories(setCategories);
    return () => controller?.abort();
  }, []);

  const [values, setValues] = useState<any>({
    name: '',
    description: '',
    price: null,
    category: '',
    images: [],
  });

  const [errorMessages, setErrorMessages] = useState<any>({
    name: '',
    description: '',
    price: '',
    category: '',
    images: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ''));
    setErrorMessages({ ...errorMessages });
    if (formArticleValidation(values, setErrorMessages, errorMessages, images)) {
      article.name = values.name;
      article.description = values.description;
      article.categorie = values.category;
      article.price = parseInt(values.price);
      article.seller = `/api/users/${user.id}`;
      try {
        await addArticle(article, token, images, setMessage, setIsValidate);
      } catch (error) {
        alert(error);
      }
    }
  };

  function handleUploadFiles(files: any[]) {
    errorMessages.images = '';
    const uploaded = [...images];
    let limitExceded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        if (file.size > MAX_FILE_SIZE) {
          errorMessages.images = 'La taille du fichier ne doit pas dépasser 2Mo';
        } else {
          uploaded.push(file);
        }
        if (uploaded.length === MAX_COUNT) setIsFull(true);
        if (uploaded.length > MAX_COUNT) {
          errorMessages.images = 'Vous avez téléchargé le nombre maximum de fichiers';
          setIsFull(true);
          limitExceded = true;
          return true;
        }
      }
      setErrorMessages({ ...errorMessages });
      if (!limitExceded) setImages(uploaded);
      setFileNumber(uploaded.length);
    });
  }

  function handleFileEvent(e: { target: { files: any } }) {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  }

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === 'description') {
      setCount(e.target.value.length);
    }
  };

  function removeFile(index: number) {
    images.splice(index, 1);
    setImages([...images]);
    setFileNumber(fileNumber - 1);
    setIsFull(false);
  }

  useEffect(() => {
    if (isValidate) {
      toast.success(message, {
        toastId: 'success2',
      });
      setTimeout(() => {
        navigate('/profile');
      }, 5000);
    }
  }, [isValidate]);

  return (
    <div className="App-add-article">
      <ToastContainer position="top-center" transition={Slide} autoClose={4200} />
      <Banner title={title} />
      <div className="add-article-wrapper">
        <form
          className="add-article-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="form-input">
            <label htmlFor={'name'}>
              <span className="label-custom-style">
                Nom de l'article
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="input-div">
              <input
                className="input"
                name="name"
                type={'text'}
                onChange={onChange}
                required
              />
            </div>
            <span className="error">{errorMessages.name}</span>
          </div>
          <div className="form-input">
            <label htmlFor={'description'}>
              <span className="label-custom-style">
                Description de l'article({count}/1000)
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="textarea-div within">
              <textarea
                maxLength={1000}
                rows={10}
                className="textarea"
                name="description"
                onInput={onChange}
                required
              />
            </div>
            <span className="error">{errorMessages.description}</span>
          </div>
          <div className="form-input">
            <label htmlFor={'price'}>
              <span className="label-custom-style">
                Prix
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="price-div within">
              <input
                className="input"
                name="price"
                min={0}
                type={'text'}
                onChange={onChange}
                required
              />
              <span>€</span>
            </div>
            <span className="error">{errorMessages.price}</span>
          </div>
          <div className="form-input">
            <label htmlFor={'category'}>
              <span className="label-custom-style">
                Sélectionnez une catégorie
                <span className="required-style"> *</span>
              </span>
            </label>
            <div className="input-div">
              <select
                className="category-div"
                name="category"
                onChange={onChange}
                defaultValue="default"
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
          <div className="article-file-wrapper">
            <input
              className="file-input"
              id="file"
              name="file"
              type={'file'}
              multiple
              disabled={fileFull}
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileEvent}
              required
            />
            <label
              htmlFor={'file'}
              className={fileFull ? 'label-file-full' : 'label-file'}
            >
              <FiUpload className="upload-icon" size={'20px'} />
              <span>
                Déposer vos photos(2Mo maximum) * {fileNumber}/{MAX_COUNT}
              </span>
            </label>
          </div>
          <div className="file-name-wrapper">
            {images.map((image: any, index: number) => (
              <div key={index} className="file-name-line">
                <span className="file-name">
                  {image.name.length < 50
                    ? image.name
                    : image.name.substring(0, 30) +
                      '...' +
                      image.name.substring(image.name.length - 20, image.name.length)}
                </span>
                <div className="remove-file">
                  <IoMdRemoveCircle
                    size={'20px'}
                    onClick={() => {
                      removeFile(index);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <span className="error">{errorMessages.images}</span>

          <button className="register-submit-button" type="submit">
            Mettre l'article en vente
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
