import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Card,
    CardBody,
    Col,
    Row,
    Container,
    Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addCategory } from "../../Services/auth";

const FormAddCategory = () => {
    document.title = "Add Category | Form Filling";

    const [formData, setFormData] = useState({
        name: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setIsSubmitting(true);
   
     try {
       const response = await addCategory(formData);
       console.log("API Response:", response);
   
       if (response) {
         setFormData({
           name: "",
         });
   
         setSuccessMessage(response.message || "Category added successfully");
         setErrorMessage(""); 
       } else {
         setErrorMessage("Unexpected response format");
       }
     } catch (error) {
       console.error("Error adding Category:", error);
       setErrorMessage(error.response?.message || "Error adding Category");
     } finally {
       setIsSubmitting(false);
     }
   };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Category" breadcrumbItem="Add Category" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <label htmlFor="name" className="col-md-2 col-form-label">
                                               Category Name
                                            </label>
                                            <div className="col-md-12">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Row>

                                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                                        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? "Adding..." : "Add"}
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

export default FormAddCategory;
