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
import { useParams } from 'react-router-dom';

const FormEditBanner = () => {
  document.title = "Edit Banner | Form Filling";
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "", // Add category ID to form data
    description: "",
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [imageFile, setImageFile] = useState(null); // State for new image file
  const [existingImage, setExistingImage] = useState(null); // State for existing image URL
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const categoryResponse = await axios.get('https://learning-backend-zn1f.onrender.com/api/admin/getall-category', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(categoryResponse); // Assuming the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch banner details
    const fetchBanner = async () => {
      try {
        const token = localStorage.getItem('token');
        const bannerResponse = await axios.get(`https://learning-backend-zn1f.onrender.com/api/admin/getbyid-banner/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bannerData = bannerResponse;
        setFormData({
          name: bannerData.title,
          categoryId: bannerData.categoryId._id, // Set the existing category ID
          description: bannerData.description, 
        });
        setExistingImage(bannerData.imageUrl); // Set the existing image URL
      } catch (error) {
        console.error("Error fetching banner details:", error);
      }
    };

    fetchCategories();
    fetchBanner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.name);
      formDataToSend.append('categoryId', formData.categoryId); // Append the category ID
      formDataToSend.append('description', formData.description);
      if (imageFile) {
        formDataToSend.append('image', imageFile); // Append the new image file if selected
      }

      await axios.put(`https://learning-backend-zn1f.onrender.com/api/admin/update-banner/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure multipart/form-data for file upload
        }
      });
      setSuccessMessage("Banner edited successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error editing banner:", error);
      setSuccessMessage("");
      setErrorMessage("Error editing banner");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Banner" breadcrumbItem="Edit" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label htmlFor="categoryId" className="col-md-2 col-form-label">
                        Category
                      </label>
                      <div className="col-md-12">
                        <select
                          className="form-control"
                          id="categoryId"
                          name="categoryId"
                          value={formData.categoryId} // Show existing category by default
                          onChange={handleChange}
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Row>

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
                        {existingImage && (
                          <div className="mb-2">
                            <img src={existingImage} alt="Banner" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                          </div>
                        )}
                        <input
                          className="form-control"
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleFileChange} // Handle file change
                          accept="image/*"
                        />
                      </div>
                    </Row>

                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                    <button type="submit" className="btn btn-primary">Edit</button>
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

export default FormEditBanner;
