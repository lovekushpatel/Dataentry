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

const FormAddBanner = () => {
  document.title = "Banner | Form Filling";

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "", // Add description to formData state
  });

  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://learning-backend-zn1f.onrender.com/api/admin/getall-category', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        setCategories(response); // Set fetched categories to state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.name);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('description', formData.description); // Add description to form data
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await axios.post('https://learning-backend-zn1f.onrender.com/api/admin/banner', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      setSuccessMessage("Banner added successfully");
      setErrorMessage("");
      setFormData({ name: "", categoryId: "", description: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding Banner:", error);
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Error adding Banner");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Banner" breadcrumbItem="Add Banner" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label htmlFor="name" className="col-md-2 col-form-label">
                        Title
                      </label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="description" className="col-md-2 col-form-label">
                        Description
                      </label>
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="image" className="col-md-2 col-form-label">
                        Image
                      </label>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="categoryId" className="col-md-2 col-form-label">
                        Select Category
                      </label>
                      <div className="col-md-12">
                        <select
                          id="categoryId"
                          name="categoryId"
                          className="form-control"
                          value={formData.categoryId}
                          onChange={handleChange}
                        >
                          <option value="">Select a category</option>
                          {categories.map(category => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>

                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                    <button type="submit" className="btn btn-primary">Add</button>
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

export default FormAddBanner;
