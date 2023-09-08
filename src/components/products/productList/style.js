import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 40px;
  border: solid 1px #ccc;
  background: #fff;
  border-radius: 10px;
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
        background-color: ${props => (
        props.status === "Approved" ? `green` : props.status === "Missing" ? `orange` : props.status === "Urgent Missing" ? `red` : props.status === "" ? `white` : `green`
    )};
        color: white;
        width: 100px;
        text-align: center;
        padding: 10px;
        border-radius: 5px;
`