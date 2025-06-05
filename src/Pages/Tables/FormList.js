import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import "./UserList.css";
import { addZips, deleteZips, downloadByIdZip, getAllZips } from "../../Services/auth";
import axios from "axios";
import { Download } from "@mui/icons-material";

const FormList = () => {
  const navigate = useNavigate();

  const [zips,setZips]=useState([])
  const [succesMessage,setSuccesMessage]=useState([])
  const [errorMessage,setErrorMessage]=useState([])
  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 2;

  const toggleModal = () => setModal(!modal);

 

  const handleDelete = (zipID) => {
    setUserIdToDelete(zipID);
    toggleModal();
};

const confirmDelete = async () => {
    if (!userIdToDelete) return;

    try {
        await deleteZips(userIdToDelete);
        setZips(zips.filter((zip) => zip.zipID !== userIdToDelete));
        setSuccesMessage("File deleted successfully.");
    } catch (error) {
        console.error("Delete error:", error);
        setErrorMessage("Failed to delete file.");
    } finally {
        toggleModal();
    }
};

 const handleAdd = async ()=>{
  try {
    const response = await addZips();

    if (response) {
      fetchUsers()
      console.log("Download successful", response);
    }
  } catch (error) {
    console.error("Download error:", error);
  }
 }

  const handleDownload = async (zipID) => {
    try {
      const response = await downloadByIdZip(zipID);
  
      if (response) {
        console.log("Download successful", response);
      }
    } catch (error) {
      console.error("Download error:", error);
    }
  };
  const handleEdit = (userId) => {
    navigate(`/edit-users/${userId}`);
  };
  const fetchUsers = async () => {
    try {
      // const response = await axios.get(`http://localhost:8000/api/admin/get-all-zips`);
      const response = await getAllZips();
      console.log("API Response:", response);
  
      if (!response || !Array.isArray(response)) {
        throw new Error("Invalid API response");
      }
  
      setZips(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Error while fetching data");
    }
  };
  

  // const filteredUsers = users
  //   .filter((user) =>
  //     user.Name.toLowerCase().includes(search.toLowerCase())
  //   )
  //   .filter((user) => (statusFilter ? user.status === statusFilter : true));

  // const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  // const displayedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  useEffect(()=>{
    fetchUsers()
  },[])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Files" breadcrumbItem="All Files List" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Files List</h4>
                  <p className="card-title-desc">Below are all registered Files</p>

                  {/* <Row className="mb-3">
                    <Col md={4}>
                      <Input
                        type="text"
                        placeholder="Search Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Col>
                    <Col md={4}>
                      <Input
                        type="select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Input>
                    </Col>
                    <Col md={4}>
                      <Button color="primary" onClick={() => setPage(1)}>
                        Submit
                      </Button>
                    </Col>
                  </Row> */}
 <button className="btn btn-sm btn-info " onClick={() => handleAdd()}>
                                 <span className="mt-3 "> <i className="dripicons-plus"></i></span>
                                  Add
                                </button>
                  <div className="table-responsive mt-2">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>S. No</th>
                          <th>ID</th>
                          {/* <th>Name</th>
                          <th>Client Number</th>
                          <th>Exchange</th>
                          <th>City</th>
                          <th>Location</th> */}
                          {/* <th>Status</th> */}
                          <th>Created Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {zips.length > 0 ? (
                          zips.map((user, index) => (
                            <tr key={user._id}>
                              <th scope="row">{(page - 1) * usersPerPage + index + 1}</th>
                              <td>{user?.zipID}</td>
                              {/* <td>{user.Name}</td>
                              <td>{user.clientNumber}</td>
                              <td>{user.exchange}</td>
                              <td>{user.city}</td>
                              <td>{user.location}</td> */}
                             
                              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                              <td className="" style={{ whiteSpace: "nowrap" }}>
                               
                                <button className="btn btn-sm btn-success me-1" onClick={() => handleDownload(user.zipID)}>
                                <i className="fa fa-download"></i>

                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.zipID)}>
                                  <i className="dripicons-document-delete"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center">
                              No users found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <br />

                  {/* <div className="pagination-controls text-center">
                    <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                      Previous
                    </Button>
                    &nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      Page {page} of {totalPages}
                    </span>
                    &nbsp;
                    <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                      Next
                    </Button>
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this user?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default FormList;
