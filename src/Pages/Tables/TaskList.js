import React, { useEffect, useState } from "react";
import {
  Card, CardBody, Col, Container, Row, Button,
  Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import "./UserList.css";
import { getAllTask } from "../../Services/auth"; // API returns grouped tasks in "data"
import moment from "moment";

const TaskList = () => {
  const navigate = useNavigate();

  // We'll store grouped tasks (each group for one user)
  const [groupedTasks, setGroupedTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  // Number of rows per page; should match the API's limit for grouping
  const rowsPerPage = 2;

  const toggleModal = () => setModal(!modal);

  const fetchPatients = async () => {
    try {
      // API call
      const response = await getAllTask(search, page);

      let sortedData = response.tasks.data?.map(patient => ({
        ...patient,
        tasks: patient.tasks.sort((a, b) =>
          new Date(b.newData?.createdAt) - new Date(a.newData?.createdAt)
        )
      })) || [];

      // Users ko bhi sort karein latest task ke basis par
      sortedData.sort((a, b) => {
        const latestA = new Date(a.tasks[0]?.newData?.createdAt || 0);
        const latestB = new Date(b.tasks[0]?.newData?.createdAt || 0);
        return latestB - latestA;
      });

      setGroupedTasks(sortedData);
      setTotalPages(response.tasks.totalPages || 1);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error while fetching data.");
    }
  };



  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  // Handle deletion of a user group by userId.
  const handleDelete = (userId) => {
    setIdToDelete(userId);
    toggleModal();
  };

  const confirmDelete = () => {
    setGroupedTasks(groupedTasks.filter((group) => group.userId !== idToDelete));
    toggleModal();
  };

  const handleEdit = (userId) => navigate(`/edit-patient/${userId}`);
  const handleView = (userId) => navigate(`/view-task/${userId}`);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Task" breadcrumbItem="All Task" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Task Grouped By User</h4>
                  <p className="card-title-desc">
                    Below are all registered task grouped by user. The "Project Count" column shows how many tasks (projects) that user has.
                  </p>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Input
                        type="text"
                        placeholder="Search by User Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <div className="table-responsive mt-2">
                    <table className="table mb-0">
                      <thead style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                        <tr>
                          <th>S. No</th>
                          {/* <th>User ID</th> */}
                          <th>User Name</th>
                          <th>Project Count</th>
                          <th> Start Date</th>
                          <th> End Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {groupedTasks.length > 0 ? (
                          groupedTasks.map((group, index) => {
                            // Find the latest createdAt for the user's tasks
                            const latestCreatedAt = group.tasks.length
                              ? new Date(
                                Math.max(
                                  ...group.tasks.map(task =>
                                    task.newData?.createdAt ? new Date(task.newData.createdAt).getTime() : 0
                                  )
                                )
                              )
                              : null;

                            return (
                              <tr key={group.userId}>
                                <td>{(page - 1) * rowsPerPage + index + 1}</td>
                                <td style={{ fontWeight: "bold" }}>{group.fullName}</td>
                                <td>{group.tasks.length}</td>
                                <td>
                                  {moment(group?.startDate).format("DD-MM-YYYY:hh mm A") || "No Date"}
                                </td>
                                <td>
                                {moment(group?.endDate).format("DD-MM-YYYY:hh mm A") || "No Date"}
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                  <button className="btn btn-sm btn-info me-1" onClick={() => handleView(group.userId)}>
                                    <i className="dripicons-preview"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5">No grouped tasks found</td>
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
                    &nbsp;<span style={{ fontWeight: "bold" }}>Page {page} of {totalPages}</span>&nbsp;
                    <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                      Next
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {errorMessage && <div className="text-center text-danger">{errorMessage}</div>}
        </Container>

        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this user group?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="danger" onClick={confirmDelete}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default TaskList;
