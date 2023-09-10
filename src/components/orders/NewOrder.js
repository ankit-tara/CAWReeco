import React, { useState } from "react";
import Modal from "../base-components/Modal";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { debounceFunction, isNumberOrDecimal } from "../../utils";
import VirtulizedTable from "../base-components/VirtulizedTable";
import { updateList } from "../../redux/reducers/ordersSlice";
import EmptyView from "../base-components/NoData";
import StyledButton from "../base-components/StyledButton";

// Styled components for the modal
const NewItemWrapper = styled.div`
  height: 500px;
  width: 100%;
  input {
    height: 28px;
    border-radius: 25px;
    border: solid 1px #ccc;
    padding-left: 10px;
  }
  .search {
    width: 300px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .action-items button {
    margin-right: 10px;
    border: none;
  }
`;

function NewOrder({ isOpen = true, closeModal, orderId }) {
  const products = useSelector((state) => state.products.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [newOrder, setNewOrder] = useState([]);
  const [isInReviewState, setIsInReviewState] = useState(true);
  const dispatch = useDispatch();

  const fetchProducts = (val) => {
    const results = products
      .map((item) => {
        if (item.name.toLowerCase().includes(val.toLowerCase())) {
          let quantityIndex = newOrder?.indexOf(item.id);
          return {
            ...item,
            quantity: quantityIndex !== "-1" ? newOrder[quantityIndex] : "",
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
    setFilterProducts(results);
  };

  const debouncedSearch = debounceFunction(fetchProducts, 300); // Adjust the delay as needed

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const simpleCellRenderer = ({ dataKey, cellData, rowData }) => {
    return <div>{cellData}</div>;
  };

  const handleEditCell = (e, rowId, dataKey, rowData) => {
    const newValue = e.target.value;
    const newRows = filterProducts.map((row) =>
      row.id === rowId ? { ...row, [dataKey]: newValue } : row
    );

    setFilterProducts(newRows);

    const isNumeric = isNumberOrDecimal(newValue);

    setNewOrder((prevOrder) => {
      if (isNumeric && !prevOrder.includes(rowId)) {
        return [...prevOrder, rowId];
      } else if (!isNumeric && prevOrder.includes(rowId)) {
        return prevOrder.filter((id) => id !== rowId);
      }
      return prevOrder;
    });
  };

  const editableCellRenderer = ({ dataKey, cellData, rowData }) => {
    return (
      <div>
        <input
          value={cellData}
          onChange={(e) => handleEditCell(e, rowData.id, dataKey, rowData)}
        />
      </div>
    );
  };

  const columns = [
    {
      dataKey: "name",
      label: "name",
      width: 90,
      cellRenderer: simpleCellRenderer,
    },
    {
      dataKey: "brand",
      label: "brand",
      width: 200,
      cellRenderer: simpleCellRenderer,
    },
    {
      dataKey: "price",
      label: "price",
      width: 200,
      cellRenderer: isInReviewState ? editableCellRenderer : simpleCellRenderer,
    },
    {
      dataKey: "quantity",
      label: "quantity",
      width: 200,
      cellRenderer: isInReviewState ? editableCellRenderer : simpleCellRenderer,
    },
  ];
  function extractFilteredProducts(productList, filteredIds) {
    const idSet = new Set(filteredIds);

    const filteredProducts = productList.filter(({ id }) => idSet.has(id));

    return filteredProducts;
  }

  const createOrder = () => {
    dispatch(
      updateList({
        products: extractFilteredProducts(filterProducts, newOrder),
        orderId,
      })
    );
    setSearchTerm("");
    setIsInReviewState(true);
    setNewOrder([]);
    setFilterProducts([]);
    closeModal();
  };

  const rows = isInReviewState
    ? filterProducts
    : extractFilteredProducts(filterProducts, newOrder);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        setSearchTerm("");
        setFilterProducts([]);
      }}
    >
      <NewItemWrapper>
        <h2>Add Product from the Sysco's catalog</h2>
        <p>Search Product from the Sysco's catalog and add</p>
        <input
          className="search"
          disabled={!isInReviewState}
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => handleInputChange(e)}
        />
        {filterProducts?.length ? (
          <VirtulizedTable rows={rows} columns={columns} />
        ) : (
          <EmptyView msg="No Data" />
        )}
      </NewItemWrapper>

      <ModalFooter>
        <p>Total: {newOrder.length} products</p>
        {isInReviewState ? (
          <StyledButton
            primary={!newOrder.length ? false : true}
            onClick={() => {
              setIsInReviewState(false);
            }}
            disabled={newOrder.length === 0}
          >
            Review
          </StyledButton>
        ) : (
          <div className="action-items">
            <StyledButton
              onClick={() => {
                setIsInReviewState(true);
              }}
            >
              Back
            </StyledButton>
            <StyledButton
              primary
              onClick={() => {
                createOrder();
              }}
            >
              Add
            </StyledButton>
          </div>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default NewOrder;
