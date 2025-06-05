// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { useNavigate } from "react-router-dom";
// import "./UserList.css";
// import { deleteUser, getAllUsers, updateByIDUser } from "../../Services/auth";

// const UsersList = () => {
//   const navigate = useNavigate();

//   const [users, setUsers] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState(null);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const [successMessage, setSuccessMessage] = useState()
//   const [errorMessage, setErrorMessage] = useState()
//   const [totalPages, setTotalPages] = useState()
//   const [toggle, setToggle] = useState();
//   const usersPerPage = 2;

//   const toggleModal = () => setModal(!modal);

//   const fechUsers = async () => {
//     try {
//       const response = await getAllUsers(search, page)
//       setUsers(response?.users?.users)
//       console.log(response?.users?.users)
//       setTotalPages(response?.users?.totalPages)
//     }
//     catch (error) {
//       console.log(error)
//       setErrorMessage("Error while feching..")
//     }
//   }

//   const handleDelete = (userId) => {
//     setUserIdToDelete(userId);
//     toggleModal();
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteUser(userIdToDelete); // Call the delete API
//       setUsers(users.filter((user) => user._id !== userIdToDelete));
//       setSuccessMessage("User deleted successfully");
//     } catch (error) {
//       setErrorMessage("Error deleting user");
//     }
//     toggleModal();
//   };
//   // Function to toggle user status
//   const toggleUserStatus = async (e, userId, currentStatus) => {
//     e.preventDefault();
//     console.log("Toggle function called for user:", userId); // Debugging line
//     try {
//       const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
//       await updateByIDUser(userId, { status: newStatus });
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId ? { ...user, status: newStatus } : user
//         )
//       );
//       setSuccessMessage(`User status updated to ${newStatus}`);
//     } catch (error) {
//       console.error("Error updating status:", error);
//       setErrorMessage("Error updating status");
//     }
//   };



//   const handleEdit = (userId) => navigate(`/edit-user/${userId}`);
//   const handleView = (userId) => navigate(`/view-user/${userId}`);



//   // const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//   // const displayedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

//   const filterUsers = statusFilter
//     ? users.filter(user => user?.status?.toLowerCase() === statusFilter?.toLowerCase())
//     : users;

//   useEffect(() => {
//     fechUsers()
//   }, [search, page])

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           <Breadcrumbs title="Users" breadcrumbItem="All Users" />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardBody>
//                   <h4 className="card-title">All Users</h4>
//                   <p className="card-title-desc">Below are all registered Users</p>

//                   <Row className="mb-3">
//                     <Col md={4}>
//                       <Input type="text" placeholder="Search Name & Email" value={search} onChange={(e) => setSearch(e.target.value)} />
//                     </Col>
//                     <Col md={4}>
//                       <Input type="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                         <option value="">All</option>
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                       </Input>
//                     </Col>
//                     {/* <Col md={4}>
//                       <Button color="primary" onClick={() => setPage(1)}>Submit</Button>
//                     </Col> */}
//                   </Row>

//                   <div className="table-responsive mt-2">
//                     <table className="table mb-0">
//                       <thead style={{ textAlign: "center", whiteSpace: "nowrap" }}>
//                         <tr>
//                           <th>S. No</th>
//                           <th>ID</th>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Phone</th>
//                           <th>Change Status</th>

//                           <th>User Status</th>

//                           {/* <th>Created Date</th> */}
//                           <th>Start Date</th>
//                           <th>End Date</th>
//                           <th>Remark</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody style={{ textAlign: "center" }}>
//                         {filterUsers.length > 0 ? (
//                           filterUsers.map((user, index) => (
//                             <tr key={user._id}>
//                               <th scope="row">{(page - 1) * usersPerPage + index + 1}</th>
//                               <td>{user?._id}</td>
//                               <td>{user?.fullName}</td>
//                               <td>{user?.email}</td>
//                               <td>{user?.phone}</td>
//                               <td>
//                                 <div className="form-check form-switch d-flex justify-content-center">
//                                   <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     role="switch"
//                                     checked={user?.status === "Active"} // Set checked based on status
//                                     onClick={(e) => toggleUserStatus(e, user._id, user.status)} // Bind onChange
//                                   />
//                                 </div>
//                               </td>
//                               <td>
//                                 <span className={`fw-bold ${user.status === "Active" ? "text-success" : "text-danger"}`}>
//                                   {user?.status}
//                                 </span>
//                               </td>
//                               <td>{new Date(user?.startDate).toLocaleDateString()}</td>
//                               <td>{new Date(user?.endDate).toLocaleDateString()}</td>
//                               <td>{user?.remark || "N/A"}</td>
//                               <td className="" style={{ whiteSpace: "nowrap" }}>
//                                 <button className="btn btn-sm btn-success me-1" onClick={() => handleEdit(user._id)}>
//                                   <i className="dripicons-document-edit"></i>
//                                 </button>
//                                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
//                                   <i className="dripicons-document-delete"></i>
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="10" className="text-center">No users found</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   <br />
//                   <div className="pagination-controls text-center">
//                     <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
//                     &nbsp;<span style={{ fontWeight: "bold" }}>Page {page} of {totalPages}</span>&nbsp;
//                     <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>

//         <Modal isOpen={modal} toggle={toggleModal}>
//           <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
//           <ModalBody>Are you sure you want to delete this user?</ModalBody>
//           <ModalFooter>
//             <Button color="secondary" onClick={toggleModal}>Cancel</Button>
//             <Button color="danger" onClick={confirmDelete}>Delete</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     </React.Fragment>
//   );
// };

// export default UsersList;


import React, { useEffect, useState } from "react";
import {
  Card, CardBody, Col, Container, Row, Button,
  Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import "./UserList.css";
import { deleteUser, getAllUsers, updateByIDUser } from "../../Services/auth";

const UsersList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [totalPages, setTotalPages] = useState();
  const usersPerPage = 2;

  const toggleModal = () => setModal(!modal);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(search, page);
      let fetchedUsers = response?.users?.users || [];
      setUsers(fetchedUsers);
      setTotalPages(response?.users?.totalPages || 1);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error while fetching...");
    }
  };

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    toggleModal();
  };

  // const confirmDelete = async () => {
  //   try {
  //     await deleteUser(userIdToDelete);
  //     setUsers(users.filter((user) => user._id !== userIdToDelete));
  //     setSuccessMessage("User deleted successfully");
  //   } catch (error) {
  //     setErrorMessage("Error deleting user");
  //   }
  //   toggleModal();
  // };

  const toggleUserStatus = async (e, userId, currentStatus) => {
    e.preventDefault();
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await updateByIDUser(userId, { status: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
      setSuccessMessage(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage("Error updating status");
    }
  };

  const handleEdit = (userId) => navigate(`/edit-user/${userId}`);

  const filterUsers = users.filter((user) => {
    const matchesStatus = statusFilter ? user?.status?.toLowerCase() === statusFilter.toLowerCase() : true;
    const matchesStartDate = startDateFilter ? new Date(user.startDate) >= new Date(startDateFilter) : true;
    const matchesEndDate = endDateFilter ? new Date(user.endDate) <= new Date(endDateFilter) : true;
    return matchesStatus && matchesStartDate && matchesEndDate;
  });

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="All Users" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">All Users</h4>
                  <p className="card-title-desc">Below are all registered Users</p>

                  <Row className="mb-3">
                    <Col md={3}>
                      <Input
                        type="text"
                        placeholder="Search Name & Email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
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
                    <Col md={2}>
                      <Input
                        type="date"
                        value={startDateFilter}
                        onChange={(e) => setStartDateFilter(e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
                      <Input
                        type="date"
                        value={endDateFilter}
                        onChange={(e) => setEndDateFilter(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <div className="table-responsive mt-2">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>S. No</th>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Change Status</th>
                          <th>User Status</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Project Name</th>
                          <th>Branch Name</th>
                          <th>Remark</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterUsers.length > 0 ? (
                          filterUsers.map((user, index) => (
                            <tr key={user._id}>
                              <td>{(page - 1) * usersPerPage + index + 1}</td>
                              <td>{user._id}</td>
                              <td>{user.fullName}</td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>
                                <div className="form-check form-switch d-flex justify-content-center">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={user.status === "Active"}
                                    onClick={(e) =>
                                      toggleUserStatus(e, user._id, user.status)
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <span
                                  className={`fw-bold ${
                                    user.status === "Active"
                                      ? "text-success"
                                      : "text-danger"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td>
                                {user?.startDate
                                  ? `${new Date(
                                      user.startDate
                                    ).toLocaleDateString()} ${user.startTime || ""}`
                                  : "N/A"}
                              </td>
                              <td>
                                {user?.endDate
                                  ? `${new Date(
                                      user.endDate
                                    ).toLocaleDateString()} ${user.endTime || ""}`
                                  : "N/A"}
                              </td>
                              <td>{user?.project?.projectName || "N/A"}</td>
                              <td>{user?.project?.branchName || "N/A"}</td>
                              <td>{user?.remark || "N/A"}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => handleEdit(user._id)}
                                >
                                  <i className="dripicons-document-edit"></i>
                                </button>
                                {/* <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(user._id)}
                                >
                                  <i className="dripicons-document-delete"></i>
                                </button> */}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center">
                              No users found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <br />
                  <div className="pagination-controls text-center">
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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
{/* 
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
        </Modal> */}
      </div>
    </React.Fragment>
  );
};

export default UsersList;
