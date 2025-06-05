import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const BannerList = () => {
    document.title = "Courses | Form Filling";

    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://learning-backend-zn1f.onrender.com/api/admin/getall-banner', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(response || []); // Ensure you're setting the response data properly
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const toggleModal = () => setModal(!modal);

    const handleDelete = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        toggleModal();
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://learning-backend-zn1f.onrender.com/api/admin/delete-banner/${categoryIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(categories.filter(category => category._id !== categoryIdToDelete));
            toggleModal();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEdit = (categoryId) => {
        navigate(`/edit-banner/${categoryId}`);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Banner" breadcrumbItem="All" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Banner</h4>
                                    <p className="card-title-desc">Below are all Banner</p>

                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Image</th>
                                                    <th>Category</th>
                                                    <th>Title</th>
                                                  
                                                    <th>Description</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.length > 0 ? (
                                                    categories.map((category, index) => (
                                                        <tr key={category._id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                {category?.imageUrl ? (
                                                                    <img 
                                                                        src={category.imageUrl} 
                                                                        alt={category.title} 
                                                                        style={{ width: "50px", height: "auto" }} 
                                                                    />
                                                                ) : (
                                                                    "No image"
                                                                )}
                                                            </td>
                                                            <td className="nowrap">{category?.categoryId?.name || "N/A"}</td>
                                                            <td className="nowrap">{category?.title || "N/A"}</td>

                                                            <td className="nowrap">{category?.description}</td>

                                                           

                                                            <td className="nowrap">
                                                                {moment(category.createdAt).format('MMMM Do, YYYY')}
                                                            </td>

                                                            <td>
                                                                <i className="dripicons-document-edit" onClick={() => handleEdit(category._id)} />{" "}
                                                                <i className="dripicons-document-delete" onClick={() => handleDelete(category._id)} />{" "}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Categories found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* Delete Confirmation Modal */}
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this category?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button color="danger" onClick={confirmDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default BannerList;
