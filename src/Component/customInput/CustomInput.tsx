/* eslint-disable @typescript-eslint/no-explicit-any */
import './customInput.css';

import { useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';

const CustomInput = (_props: any) => {
  const { label, errorMessage, type, id, onChange, isRequired, ...inputProps } = _props;
  const showPasswordId = [10, 11];
  const [passwordVisible, setPasswordVisible] = useState(false);
  function handleVisible() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="form-input">
      <label htmlFor={inputProps.name}>
        <span className="label-custom-style">
          {label}
          {isRequired && <span className="required-style"> *</span>}
        </span>
      </label>
      <div className="input-div">
        <input
          className="input"
          id={inputProps.name}
          {...inputProps}
          type={showPasswordId.includes(id) ? (passwordVisible ? 'text' : type) : type}
          onChange={onChange}
          required={isRequired}
        />
        {showPasswordId.includes(id) ? (
          passwordVisible ? (
            <BiShow size={'3vh'} className="show-password" onClick={handleVisible} />
          ) : (
            <BiHide size={'3vh'} className="show-password" onClick={handleVisible} />
          )
        ) : null}
      </div>
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default CustomInput;
