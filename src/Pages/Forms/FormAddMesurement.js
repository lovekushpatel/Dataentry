import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Card,
    CardBody,
    Col,
    Row,
    Container,
    Alert,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addMeasurements, getAllCategory, getAllCategoryWithoutSearch } from "../../Services/auth";


const FormAddMeasurement = () => {
    document.title = "Add Measurement | Form Filling";

    const [formData, setFormData] = useState({
        categoryId: "",
        measurements: [],
    });

    const [categories, setCategories] = useState([]);
    const [measurementName, setMeasurementName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategoryWithoutSearch(); // Assuming you have an API to get categories
                setCategories(response || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMeasurementChange = (e) => {
        setMeasurementName(e.target.value);
    };

    const addMeasurement = () => {
        if (measurementName.trim() !== "") {
            setFormData(prevState => ({
                ...prevState,
                measurements: [
                    ...prevState.measurements,
                    { name: measurementName, value: 0 }
                ]
            }));
            setMeasurementName(""); // Clear the input field
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await addMeasurements(formData);
            console.log("API Response:", response);

            if (response) {
                setFormData({
                    categoryId: "",
                    measurements: [],
                });
                setSuccessMessage(response.message || "Measurements added successfully");
                setErrorMessage(""); 
            } else {
                setErrorMessage("Unexpected response format");
            }
        } catch (error) {
            console.error("Error adding Measurement:", error);
            setErrorMessage(error.response?.message || "Error adding Measurements");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Measurement" breadcrumbItem="Add Measurement" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Label htmlFor="categoryId" className="col-md-2 col-form-label">
                                                Category
                                            </Label>
                                            <div className="col-md-10">
                                                <select
                                                    className="form-control"
                                                    id="categoryId"
                                                    name="categoryId"
                                                    value={formData.categoryId}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Category</option>
                                                    {categories.map((category) => (
                                                        <option key={category._id} value={category._id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <Label htmlFor="measurementName" className="col-md-2 col-form-label">
                                                Measurement Name
                                            </Label>
                                            <div className="col-md-10">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="measurementName"
                                                    value={measurementName}
                                                    onChange={handleMeasurementChange}
                                                    placeholder="Enter measurement name"
                                                />
                                            </div>
                                        </Row>

                                        <Row className="mb-3">
                                            <div className="col-md-10 offset-md-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={addMeasurement}
                                                >
                                                    Add Measurement
                                                </button>
                                            </div>
                                        </Row>

                                        {formData.measurements.length > 0 && (
                                            <div className="mb-3">
                                                <h5>Added Measurements:</h5>
                                                <ul>
                                                    {formData.measurements.map((measurement, index) => (
                                                        <li key={index}>{measurement.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                                        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Adding..." : "Add Measurements"}
                                        </button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormAddMeasurement;
