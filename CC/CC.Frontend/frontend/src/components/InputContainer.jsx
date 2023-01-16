import React from 'react'

const InputContainer = ({labelText, inputName, inputVariable}) => {
    const handleChange = (e) => {
        e.preventDefault();
        inputVariable = e.target.value;
    }

  return (
    <div className="input-container" onChange={handleChange}>
        <label>{labelText}</label>
        <input type="text" name={inputName} required />
    </div>
  )
}

export default InputContainer;