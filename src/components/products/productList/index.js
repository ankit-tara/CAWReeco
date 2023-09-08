import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../redux/reducers/productSlice';
import ProductForm from '../productForm'
import { Table, TableHeader, TableRow, TableCell } from '../../base-components/Table';
import { updateProduct } from '../../../redux/reducers/productSlice';
import { ProductListWrapper, ActionButtons, StatusWrapper, NoBackgroundBtn, MissingModalWrapper } from './style'
import Modal from '../../base-components/Modal';

function ProductList() {
    const columns = [
        { key: 'name', header: 'Product Name' },
        { key: 'brand', header: 'Brand' },
        { key: 'price', header: 'Price' },
        { key: 'quantity', header: 'Quantity' },
        { key: 'total', header: 'Total' },
        { key: 'status', header: 'Status' },
    ];

    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState();
    const [isMissingModalOpen, setIsMissingModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const closeMissingModal = () => {
        setIsMissingModalOpen(false);
    };

    const products = useSelector((state) => state.products.products);
    const getProductById = (productId) => {
        return products.find((product) => product.id === productId);
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const editProduct = (id) => {
        const product = getProductById(id)
        setSelectedProduct(product)
        setIsEditModalOpen(true)
    }

    const approveProduct = (id) => {
        const product = getProductById(id)
        dispatch(updateProduct({ ...product, status: "Approved" }));
    }

    const missingProduct = (id) => {
        setSelectedProduct(getProductById(id))
        setIsMissingModalOpen(true)
    }

    const closeModal = () => {
        setIsEditModalOpen(false)
    }

    return (
        <ProductListWrapper>
            <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                <ProductForm product={selectedProduct} onClose={closeModal} />
            </Modal>

            <Table>
                {columns.map((item) => <TableHeader key={item.key}>{item.header}</TableHeader>)}
                {products.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((column) => (
                            column.key === "name" ?
                                // name view
                                <TableCell key={column.key}>
                                    {column.key === "name" ? <img style={{ marginRight: "10px" }} width="40" src={row.imgSrc} /> : ""}
                                    {row[column.key]}
                                </TableCell>
                                :
                                // status view
                                column.key === "status" ?
                                    <TableCell key={column.key}>
                                        <StatusWrapper status={row.status}>
                                            {row.status}
                                        </StatusWrapper>
                                    </TableCell>
                                    // default view
                                    : <TableCell key={column.key}>
                                        {row[column.key]}
                                    </TableCell>
                        ))}
                        <TableCell>
                            <ActionButtons>
                                <button className={`approved ${row.status === "" || row.status === "Missing" || row.status === "Urgent Missing" ? '' : 'active'}`} onClick={() => approveProduct(row.id)}>
                                    {row.status === "" || row.status === "Missing" || row.status === "Urgent Missing" ? '✔️' : '✅'}
                                </button>
                                <button className={`missing ${row.status === "Missing" || row.status === "Urgent Missing" ? 'active' : ''}`} onClick={() => missingProduct(row.id)}>
                                    ❌
                                </button>
                                <NoBackgroundBtn onClick={() => editProduct(row.id)}>Edit</NoBackgroundBtn>
                            </ActionButtons>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>



            {/* Missing Modal */}

            <Modal isOpen={isMissingModalOpen} onClose={closeMissingModal}>
                <MissingModalWrapper>
                    <h2>
                        is {selectedProduct?.name} urgent ?
                    </h2>
                    <NoBackgroundBtn onClick={() => {
                        dispatch(updateProduct({ ...selectedProduct, status: "Urgent Missing" }))
                        closeMissingModal()
                    }}>
                        yes
                    </NoBackgroundBtn>
                    <NoBackgroundBtn onClick={() => {
                        dispatch(updateProduct({ ...selectedProduct, status: "Missing" }))
                        closeMissingModal()
                    }}>
                        no
                    </NoBackgroundBtn>
                </MissingModalWrapper>
            </Modal>
        </ProductListWrapper>
    );
}

export default ProductList;
