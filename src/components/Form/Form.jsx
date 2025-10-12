import React from 'react';
import './Form.css';
const Form = ({ children, onSubmit, title }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      {title && <h3 className="form-title">{title}</h3>}
      {children}
    </form>
  );
};
export default Form;
