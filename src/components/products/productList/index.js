import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/reducers/productSlice";
import EditForm from "../editForm";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "../../base-components/Table";
import {
  ProductListWrapper,
  ActionButtons,
  StatusWrapper,
  NoBackgroundBtn,
  MissingModalWrapper,
  ImageNameWrapper,
  NoData,
} from "./style";
import Modal from "../../base-components/Modal";
import NewOrder from "../../orders/NewOrder";
import { updateOrder } from "../../../redux/reducers/ordersSlice";
import { useParams } from "react-router-dom";

function ProductList() {
  const columns = [
    { key: "name", header: "Product Name" },
    { key: "brand", header: "Brand" },
    { key: "price", header: "Price" },
    { key: "quantity", header: "Quantity" },
    { key: "total", header: "Total" },
    { key: "status", header: "Status" },
  ];

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState();
  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const params = useParams(); 

  const closeMissingModal = () => {
    setIsMissingModalOpen(false);
  };

  let orderId = params.orderId;

  const products = useSelector((state) =>
    state.orders.orders?.length
      ? state.orders.orders.find((order) => order.orderId === orderId)?.products
      : []
  );
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const editProduct = (id) => {
    const product = getProductById(id);
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const approveProduct = (id) => {
    const product = getProductById(id);
    dispatch(
      updateOrder({
        product: {
          ...product,
          status: "Approved",
        },
        orderId: orderId,
      })
    );
  };

  const missingProduct = (id) => {
    setSelectedProduct(getProductById(id));
    setIsMissingModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <ProductListWrapper>
      <p
        onClick={() => {
          setIsNewOrderOpen(true);
        }}
      >
        Add new
      </p>
      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        <EditForm
          product={selectedProduct}
          onClose={closeModal}
          orderId={orderId}
        />
      </Modal>

      <Table>
        {columns.map((item) => (
          <TableHeader key={item.key}>{item.header}</TableHeader>
        ))}
        {products.length ? (
          products.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) =>
                column.key === "name" ? (
                  // name view
                  <TableCell key={column.key}>
                    <ImageNameWrapper>
                      {column.key === "name" ? (
                        <img
                          alt="Product"
                          style={{ marginRight: "10px" }}
                          width="40"
                          src={row.imgSrc}
                        />
                      ) : (
                        ""
                      )}
                      {row[column.key]}
                    </ImageNameWrapper>
                  </TableCell>
                ) : // status view
                column.key === "status" ? (
                  <TableCell key={column.key}>
                    <StatusWrapper status={row.status}>
                      {row.status}
                    </StatusWrapper>
                  </TableCell>
                ) : (
                  // default view
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                )
              )}
              <TableCell>
                <ActionButtons>
                  <button
                    className={`approved ${
                      row.status === "" ||
                      row.status === "Missing" ||
                      row.status === "Urgent Missing"
                        ? ""
                        : "active"
                    }`}
                    onClick={() => approveProduct(row.id)}
                  >
                    {row.status === "" ||
                    row.status === "Missing" ||
                    row.status === "Urgent Missing"
                      ? "✔️"
                      : "✅"}
                  </button>
                  <button
                    className={`missing ${
                      row.status === "Missing" ||
                      row.status === "Urgent Missing"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => missingProduct(row.id)}
                  >
                    ❌
                  </button>
                  <NoBackgroundBtn onClick={() => editProduct(row.id)}>
                    Edit
                  </NoBackgroundBtn>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <NoData>No Data</NoData>
            </TableCell>
          </TableRow>
        )}
      </Table>

      {/* Missing Modal */}

      <Modal isOpen={isMissingModalOpen} onClose={closeMissingModal}>
        <MissingModalWrapper>
          <h2>is {selectedProduct?.name} urgent ?</h2>
          <NoBackgroundBtn
            onClick={() => {
              dispatch(
                updateOrder({
                  product: {
                    ...selectedProduct,
                    status: "Urgent Missing",
                  },
                  orderId: orderId,
                })
              );
              closeMissingModal();
            }}
          >
            yes
          </NoBackgroundBtn>
          <NoBackgroundBtn
            onClick={() => {
              dispatch(
                updateOrder({
                  product: {
                    ...selectedProduct,
                    status: "Missing",
                  },
                  orderId: orderId,
                })
              );
              closeMissingModal();
            }}
          >
            no
          </NoBackgroundBtn>
        </MissingModalWrapper>
      </Modal>
      <NewOrder
        isOpen={isNewOrderOpen}
        closeModal={() => {
          setIsNewOrderOpen(false);
        }}
        orderId={orderId}
      />
    </ProductListWrapper>
  );
}

export default ProductList;
