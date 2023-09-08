import styled from 'styled-components';

export const FormContainer = styled.div`
  padding: 20px;
  border-radius: 5px;
  form {
      display: flex;
      flex-direction: column;
      width: 250px;
  }

  input {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
  }
  .inputWrapper{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .section-wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 250px;
      }
  }
  `;
export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 50px;
  text-align: center;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const QuantityButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px;
`;