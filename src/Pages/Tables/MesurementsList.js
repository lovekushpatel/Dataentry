import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { deleteMeasurement, deleteMeasurements, getAllMeasurement, getAllMeasurements } from "../../Services/auth"; // Adjust the import for getAllMeasurement

const MesurementsList = () => {
    document.title = "Measurement | Form Filling";

    const [measurement, setMeasurement] = useState([]);
    const [modal, setModal] = useState(false);
    const [measurementIdToDelete, setMeasurementIdToDelete] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchMeasurement = async () => {
        try {
            const response = await getAllMeasurements(search);  // Use search and page as params
            setMeasurement(response.categories); 
        } catch (error) {
            console.error("Error fetching Measurement:", error);
        }
    };

    useEffect(() => {
        fetchMeasurement();
    }, [search, page]); // Fetch Measurement whenever search term or page changes

    const toggleModal = () => setModal(!modal);

    const handleDelete = (measurementId) => {
        setMeasurementIdToDelete(measurementId);
        toggleModal();
    };

    const confirmDelete = async () => {
        try {
            await deleteMeasurements(measurementIdToDelete,measurementIdToDelete);  // Call the delete API
            setMeasurement(measurement.filter(m => m._id !== measurementIdToDelete));  // Remove Measurement from state
            toggleModal();  // Close the modal
        } catch (error) {
            console.error('Error deleting Measurement:', error);
        }
    };

    const handleEdit = (measurementId) => {
        navigate(`/edit-measurement/${measurementId}`);  // Navigate to edit page for Measurement
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
                    <Breadcrumbs title="Measurement" breadcrumbItem="All Measurement" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">All Measurements</h4>
                                    <p className="card-title-desc">Below are all registered measurements</p>

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
                                                    <th>Measurements</th>
                                                    <th>Category Name</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ textAlign: "center" }}>
                                                {measurement?.length > 0 ? (
                                                    measurement.map((m, index) => (
                                                        <tr key={m._id}>
                                                            <th scope="row">{(page - 1) * 10 + index + 1}</th>
                                                            <td>
                                                                {m?.measurements?.map(measurement => measurement.name).join(", ")}
                                                            </td>
                                                            <td>{m?.categoryId?.name}</td>
                                                            <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                                                            <td>
                                                                <i className="dripicons-document-edit" onClick={() => handleEdit(m._id)} />{" "}
                                                                <i className="dripicons-document-delete" onClick={() => handleDelete(m._id)} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Measurement found</td>
                                                    </tr>
                                                )}
                                            </tbody>

                                        </table>
                                    </div>

                                    <br />

                                    {/* Pagination Controls */}
                                    {/* <div className="pagination-controls" style={{ textAlign: "center" }}>
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
                                    </div> */}
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

export default MesurementsList;
