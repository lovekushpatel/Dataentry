import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllOrders, updateByIDOrders, updateOrderStatus } from "../../Services/auth";
import './Orders.css'

const OrdersList = () => {
  document.title = "Orders | Form Filling";

  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { users, totalPages } = await getAllOrders(search, page);
      setOrders(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, page]);

  const toggleModal = () => setModal(!modal);

  const handleDelete = (orderId) => {
    setOrderIdToDelete(orderId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteUser(orderIdToDelete);
      setOrders(orders.filter(order => order._id !== orderIdToDelete));
      toggleModal();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEdit = (orderId) => {
    navigate(`/edit-orders/${orderId}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const toggleDropdown = (orderId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await updateByIDOrders(orderId, newStatus);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Orders" breadcrumbItem="All Orders" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Orders</h4>
                  <p className="card-title-desc">Below are all registered Orders</p>

                  <Input
                    type="text"
                    placeholder="Search Name"
                    value={search}
                    onChange={handleSearch}
                    className="col-md-6 mb-3"
                  />

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>#</th>
                          <th>Customer Name</th>
                          <th>Phone Number</th>
                          <th>Category</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Sub Orders Count</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {orders?.length > 0 ? (
                          orders.map((order, index) => (
                            <tr key={order._id}>
                              <th scope="row">{(page - 1) * 10 + index + 1}</th>
                              <td>{order.name}</td>
                              <td>{order.phoneNumber}</td>
                              <td>{order.categoryId?.name}</td>
                              <td>{order.amount}</td>
                              <td>
                                <Dropdown
                                  isOpen={dropdownOpen[order._id] || false}
                                  toggle={() => toggleDropdown(order._id)}
                                  className="custom-dropdown"
                                >
                                  <DropdownToggle caret>{order.status}</DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => handleStatusChange(order._id, "inProgress")}>Pending</DropdownItem>
                                    <DropdownItem onClick={() => handleStatusChange(order._id, "done")}>Done</DropdownItem>
                                    <DropdownItem onClick={() => handleStatusChange(order._id, "failed")}>Failed</DropdownItem>
                                    <DropdownItem onClick={() => handleStatusChange(order._id, "delivered")}>Delivered</DropdownItem>
                                    <DropdownItem onClick={() => handleStatusChange(order._id, "duePayment")}>Due Payment</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </td>
                              <td>{order.subOrders?.length || 0}</td>
                              <td>
                                <i className="dripicons-document-edit" onClick={() => handleEdit(order._id)} />{" "}
                                <i className="dripicons-document-delete" onClick={() => handleDelete(order._id)} />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">No orders found</td>
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
          <ModalBody>Are you sure you want to delete this order?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="danger" onClick={confirmDelete}>Delete</Button>
          </ModalFooter>
        </Modal>

      </div>
    </React.Fragment>
  );
};

export default OrdersList;