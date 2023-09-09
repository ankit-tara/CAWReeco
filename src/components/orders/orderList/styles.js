import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  min-height: 100vh;
`;

const OrderListContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderLink = styled.p`
  color: #333;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
    color: white;
  }
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export { PageContainer, OrderListContainer, AddButton, OrderLink };