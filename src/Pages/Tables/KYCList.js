import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserList.css"

const KYCList = () => {
  document.title = "Users | Form Filling";

  const [users, setUsers] = useState([
    {
      _id: "1",
      image: "https://via.placeholder.com/50",
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      city: "Los Angeles",
      packageFees: "500",
      createdAt: "2023-06-15T10:00:00Z",
      status: "Pending",
    },
    {
      _id: "2",
      image: "https://via.placeholder.com/50",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "0987654321",
      city: "Austin",
      packageFees: "500",
      createdAt: "2023-07-10T12:00:00Z",
      status: "Approved",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://learning-backend-zn1f.onrender.com/api/admin/getall-users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page }
      });

      setUsers(response.data.users || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  // Toggle delete confirmation modal
  const toggleModal = () => setModal(!modal);

  // Handle user deletion
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://learning-backend-zn1f.onrender.com/api/admin/delete-user/${userIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(users.filter(user => user._id !== userIdToDelete));
      toggleModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle user edit
  const handleEdit = (userId) => {
    navigate(`/edit-subagent/${userId}`);
  };

  // Handle status change
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://learning-backend-zn1f.onrender.com/api/admin/update-user-status/${userId}`, 
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state with the new status
      setUsers(users.map(user => user._id === userId ? { ...user, status: newStatus } : user));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="All Sub Agent" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Sub Agent</h4>
                  <p className="card-title-desc">Below are all sub agents</p>

                  <Input
                    type="text"
                    placeholder="Search by Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="col-md-6 mb-3"
                  />

                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead style={{textAlign:"center"}}>
                        <tr>
                          <th>#</th>
                          <th>Profile Image</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>City</th>
                          <th>Package Fees</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{textAlign:"center"}}>
                        {users.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={user._id}>
                              <th scope="row">{(page - 1) * 10 + index + 1}</th>
                              <td>
                                {user.image ? (
                                  <img src={user.image} alt="img" style={{ width: "50px", height: "auto" }} />
                                ) : (
                                  "No image"
                                )}
                              </td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.phoneNumber}</td>
                              <td>{user.city}</td>
                              <td>{user.packageFees}</td>

                              {/* Status Dropdown */}
                              <td>
                                <select 
                                  className="form-control"
                                  value={user.status}
                                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Approved">Approved</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>

                              <td>
                                <i className="dripicons-document-edit" onClick={() => handleEdit(user._id)} />{" "}
                                <i className="dripicons-document-delete" onClick={() => { setUserIdToDelete(user._id); toggleModal(); }} />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="pagination-controls" style={{ textAlign: "center" }}>
                    {[...Array(totalPages)].map((_, index) => (
                      <Button key={index} onClick={() => setPage(index + 1)} disabled={page === index + 1}>
                        {index + 1}
                      </Button>
                    ))}
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

export default KYCList;
