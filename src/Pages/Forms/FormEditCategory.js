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

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from 'react-router-dom'; // Import useParams to get the user ID from the URL
import { getbyidCategory, getbyidUser, updateByIDCategory, updateByIDUser } from "../../Services/auth";

const FormEditCategory = () => {
  document.title = "Edit Category | Form Filling";
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getbyidCategory(id); // Await the response
        const categoryData = response; // Correct the response handling
        console.log(categoryData, "categoryData");

        setFormData({
          name: categoryData?.name || "", // Update name field
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Category details:", error);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      const dataToSend = {
        name: formData.name, // Only sending name for update
      };

      const response = await updateByIDCategory(dataToSend, id);  // Await the response

      if (response) {
        setSuccessMessage("Category edited successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating Category");
      }
    } catch (error) {
      console.error("Error editing Category:", error);
      setSuccessMessage("");
      setErrorMessage("Error editing Category");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Category" breadcrumbItem="Edit Category" />
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
                          type="name"
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
                      {isSubmitting ? "Updating..." : "Update"}
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

export default FormEditCategory;
