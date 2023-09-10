import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 40px;
  border: solid 1px #ccc;
  background: #fff;
  border-radius: 10px;

  .btn-wrapper{
    margin-bottom: 20px;
    text-align: right
  }
`;

export const ActionButtons = styled.div`
    .missing, .approved {
        background: none;
        border: none;
        filter: grayscale(1);
        opacity: 0.3;
        margin-right: 10px;
        cursor: pointer;

        &.active{
            filter: none;
            opacity: 1;
        }
    }
`

export const MissingModalWrapper = styled.div`

`

export const NoBackgroundBtn = styled.button`
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 10px;
`

export const StatusWrapper = styled.div`
  background-color: ${(props) =>
    props.status === "Approved"
      ? `#3eca72`
      : props.status === "Missing"
      ? `#f26b44`
      : props.status === "Urgent Missing"
      ? `#db2114`
      : props.status === ""
      ? `white`
      : `#3eca72`};
  color: white;
  width: max-content;
  text-align: center;
  padding: 10px 20px;
  border-radius: 25px;
  line-height: 16px;
`;

export const ImageNameWrapper = styled.div`
        display: flex;
        align-items: center;
`