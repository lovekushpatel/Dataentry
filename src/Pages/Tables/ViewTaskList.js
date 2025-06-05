import React, { useEffect, useState } from "react";
import {
    Card, CardBody, Col, Container, Row, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Label,
    Input,
    Form,
    FormGroup
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import "./UserList.css";
import { getbyUserIdTask, updateByIDTask } from "../../Services/auth";
import moment from 'moment';
import * as XLSX from "xlsx";
const ViewTaskList = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // userId

    const [userTaskData, setUserTaskData] = useState(null);
    const [modal, setModal] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const toggleModal = () => setModal(!modal);

    const fetchTasks = async () => {
        try {
            const response = await getbyUserIdTask(id);
            const sortedTasks = response.data.tasks.sort((a, b) =>
                new Date(b.newData.createdAt) - new Date(a.newData.createdAt)
            );
            setUserTaskData({ ...response.data, tasks: sortedTasks });
        } catch (error) {
            console.error(error);
            setErrorMessage("Error while fetching tasks.");
        }
    };
    const handleEdit = (task) => {
        setEditTask(task);
        setUpdatedData({ ...task.newData, _id: task._id }); // Ensure `_id` is included
        toggleModal();
    };

    const downloadExcel = () => {
        if (!userTaskData || !userTaskData.tasks || userTaskData.tasks.length === 0) {
            alert("No data available to download");
            return;
        }
    
        const wsData = [];
        const allFieldsWithSerial = ["S. No", ...allFields];
    
        wsData.push(allFieldsWithSerial); // Headers row
    
        userTaskData.tasks.forEach((task, index) => {
            const oldRow = [index + 1];  // Old Data Row
            const newRow = [" "];        // New Data Row (Empty Serial)
    
            allFields.forEach((field) => {
                const oldValue = task.oldData?.[field] || "";
                const newValue = task.newData?.[field] || "";
    
                oldRow.push(oldValue);
                
                // Agar old data aur new data match nahi karte to new value ko highlight kar do
                if (oldValue !== newValue) {
                    newRow.push("🔴 " + newValue); // Ex: !! ChangedValue
                } else {
                    newRow.push(newValue);
                }
            });
    
            wsData.push(oldRow);
            wsData.push(newRow);
        });
    
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);
    
        XLSX.utils.book_append_sheet(wb, ws, "User Tasks");
        XLSX.writeFile(wb, `User_Tasks_${id}.xlsx`);
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleSubmit = async () => {
        console.log(editTask?.newData?._id, "editTask")
        try {
            await updateByIDTask(updatedData, editTask?.newData?._id,);
            toggleModal();
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const excludedFields = ["__v", "createdAt", "updatedAt", "userId", "main_id", "fullName", "_id", "consent", "hospitalBill", "patientMedicineBill", "totalInsurancePayout", "totalInsurancePayoutWords", "startDate", "endDate"];

    const getAllFields = () => {
        const fieldsSet = new Set();
        if (userTaskData && userTaskData.tasks) {
            userTaskData.tasks.forEach(task => {
                if (task.oldData) {
                    Object.keys(task.oldData).forEach(key => fieldsSet.add(key));
                }
                if (task.newData) {
                    Object.keys(task.newData).forEach(key => fieldsSet.add(key));
                }
            });
        }
        return Array.from(fieldsSet).filter(key => !excludedFields.includes(key));
    };

    const allFields = getAllFields();
    const totalColumns = 2 + allFields.length;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Patients" breadcrumbItem="User Tasks" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                <Button className="mb-2" color="success" onClick={downloadExcel}>Download Excel</Button>

                                    <h4 className="card-title">Patient Tasks for User</h4>
                                    {userTaskData && (
                                        <p className="card-title-desc">
                                            User: <strong>{userTaskData.fullName}</strong> (ID: {userTaskData.userId})<br />
                                            {/* Start Date: <strong>{moment(userTaskData.startDate).format("DD-MM-YYYY hh:mm A")}</strong> <br />
                                            End Date: <strong>{moment(userTaskData.endDate).format("DD-MM-YYYY hh:mm A")}</strong> */}
                                        </p>
                                    )}
                                    <div className="table-responsive mt-2">
                                        <table className="table table-bordered">
                                            <thead style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                                <tr>
                                                    <th rowSpan="2" style={{ borderRight: "1px solid #ccc" }}>S. No</th>
                                                    {allFields.map((field) => (
                                                        <th key={field} style={{ borderRight: "1px solid #ccc" }}>{field}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userTaskData && userTaskData.tasks && userTaskData.tasks.length > 0 ? (
                                                    userTaskData.tasks.map((task, index) => (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                <td rowSpan="2" style={{ verticalAlign: "middle", textAlign: "center", borderRight: "1px solid #ccc" }}>
                                                                    {index + 1}
                                                                </td>
                                                                {allFields.map((field) => (
                                                                    <td key={field} style={{ textAlign: "center", borderRight: "1px solid #ccc" }}>
                                                                        {task.oldData && task.oldData[field] !== undefined
                                                                            ? task.oldData[field]?.toString()
                                                                            : ""}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                            <tr>
                                                                {allFields.map((field) => {
                                                                    const newVal = (task.newData && task.newData[field] !== undefined) ? task.newData[field].toString() : "";
                                                                    const oldVal = (task.oldData && task.oldData[field] !== undefined) ? task.oldData[field].toString() : "";
                                                                    const isDifferent = newVal !== oldVal;
                                                                    return (
                                                                        <td key={field} style={{ textAlign: "center", backgroundColor: "#e9ecef", color: isDifferent ? "red" : "#000", borderRight: "1px solid #ccc" }}>
                                                                            {newVal}
                                                                        </td>

                                                                    );
                                                                })}
                                                                <td>
                                                                    <span color="primary" style={{ cursor: "pointer" }} onClick={() => handleEdit(task)}>.</span>
                                                                </td>
                                                            </tr>
                                                            {index !== userTaskData.tasks.length - 1 && (
                                                                <tr>
                                                                    <td colSpan={totalColumns} style={{ padding: 0 }}>
                                                                        <hr style={{ margin: 0 }} />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={totalColumns} className="text-center">No tasks found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {errorMessage && <div className="text-center text-danger">{errorMessage}</div>}
                </Container>
            </div>
            {/* Edit Modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Task</ModalHeader>
                <ModalBody>
                    <Form>
                        {allFields.map(field => (
                            <FormGroup key={field}>
                                <Label>{field}</Label>
                                <Input type="text" name={field} value={updatedData[field] || ""} onChange={handleChange} />
                            </FormGroup>
                        ))}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default ViewTaskList;
