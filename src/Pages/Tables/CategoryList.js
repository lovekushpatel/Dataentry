import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserList.css";
import { deleteCategory, deleteUser, getAllCategory } from "../../Services/auth"; // Adjust the import for getAllCategory

const CategoryList = () => {
  document.title = "Category | Form Filling";

  const [category, setCategory] = useState([]);
  const [modal, setModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await getAllCategory(search, page);  // Use search and page as params
      setCategory(response.categories);  // Set the fetched categories
      setTotalPages(response.totalPages);  // Set total pages from response
    } catch (error) {
      console.error("Error fetching Category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [search, page]); // Fetch Category whenever search term or page changes

  const toggleModal = () => setModal(!modal);

  const handleDelete = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(categoryIdToDelete);  // Call the delete API
      setCategory(category.filter(c => c._id !== categoryIdToDelete));  // Remove category from state
      toggleModal();  // Close the modal
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (categoryId) => {
    navigate(`/edit-category/${categoryId}`);  // Navigate to edit page for category
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Category" breadcrumbItem="All Category" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Categories</h4>
                  <p className="card-title-desc">Below are all registered categories</p>

                  <Input
                    type="text"
                    placeholder="Search Category Name"
                    value={search}
                    onChange={handleSearch}
                    className="col-md-6 mb-3"
                  />

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>#</th>
                          <th>Category Name</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {category?.length > 0 ? (
                          category.map((cat, index) => (
                            <tr key={cat._id}>
                              <th scope="row">{(page - 1) * 10 + index + 1}</th>
                              <td className="nowrap">{cat?.name}</td>
                              <td className="nowrap">{new Date(cat.createdAt).toLocaleDateString()}</td>
                              <td>
                                <i className="dripicons-document-edit" onClick={() => handleEdit(cat._id)} />{" "}
                                <i className="dripicons-document-delete" onClick={() => handleDelete(cat._id)} />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">No Category found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <br />

                  {/* Pagination Controls */}
                  <div className="pagination-controls" style={{ textAlign: "center" }}>
                    <Button onClick={() => changePage(page - 1)} disabled={page === 1}>
                      Previous
                    </Button>
                    &nbsp;
                    {Array.from({ length: totalPages }, (_, index) => (
                      <Button
                        key={index}
                        onClick={() => changePage(index + 1)}
                        active={page === index + 1}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    &nbsp;
                    <Button onClick={() => changePage(page + 1)} disabled={page >= totalPages}>
                      Next
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="danger" onClick={confirmDelete}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CategoryList;
