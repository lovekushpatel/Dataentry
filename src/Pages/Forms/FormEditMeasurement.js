import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Alert,
  Label,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from 'react-router-dom';
import {
  getAllCategoryWithoutSearch,
  getbyidMeasurements,
  updateByIDMeasurements,
  deleteMeasurementsPArticular
} from "../../Services/auth";

const FormEditMeasurement = () => {
  document.title = "Edit Measurement | Form Filling";
  const { id } = useParams(); // Get the measurement ID from the URL

  const [formData, setFormData] = useState({
    categoryId: "",
    measurements: [],
  });

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newMeasurementName, setNewMeasurementName] = useState(""); // New measurement field

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoryWithoutSearch();
        setCategories(response || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchMeasurement = async () => {
      try {
        const response = await getbyidMeasurements(id);
        setFormData({
          categoryId: response?.measurement?.categoryId?._id || "",
          measurements: response?.measurement?.measurements || [],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching measurement data:", error);
        setLoading(false);
      }
    };

    fetchCategories();
    fetchMeasurement();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMeasurementChange = (index, newName) => {
    const updatedMeasurements = [...formData.measurements];
    updatedMeasurements[index].name = newName;
    setFormData({ ...formData, measurements: updatedMeasurements });
  };

  const addMeasurement = async () => {
    if (!newMeasurementName.trim()) {
      setErrorMessage("Measurement name cannot be empty.");
      return;
    }

    const newMeasurement = { name: newMeasurementName, value: 0 };

    try {
      const updatedData = {
        ...formData,
        measurements: [...formData.measurements, newMeasurement],
      };
      const response = await updateByIDMeasurements(updatedData, id);
      if (response) {
        setFormData(updatedData);
        setSuccessMessage("Measurement added successfully!");
        setNewMeasurementName(""); // Reset input field
      } else {
        setErrorMessage("Error adding measurement");
      }
    } catch (error) {
      console.error("Error adding measurement:", error);
      setErrorMessage("Error adding measurement");
    }
  };

  const deleteMeasurement = async (measurementId) => {
    try {
      await deleteMeasurementsPArticular(id, measurementId);
      setFormData((prevState) => ({
        ...prevState,
        measurements: prevState.measurements.filter(
          (measurement) => measurement._id !== measurementId
        ),
      }));
      setSuccessMessage("Measurement deleted successfully!");
    } catch (error) {
      console.error("Error deleting measurement:", error);
      setErrorMessage("Error deleting measurement");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateByIDMeasurements(formData, id);
      if (response) {
        setSuccessMessage("Measurement updated successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating Measurement");
      }
    } catch (error) {
      console.error("Error updating measurement:", error);
      setErrorMessage("Error updating Measurement");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Measurement" breadcrumbItem="Edit Measurement" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    {/* Category Select */}
                    <Row className="mb-3">
                      <Label htmlFor="categoryId" className="col-md-2 col-form-label">
                        Category
                      </Label>
                      <div className="col-md-12">
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

                    {/* Existing Measurements (Editable) */}
                    {formData.measurements.length > 0 && (
                      <div className="mb-3">
                        <h5>Measurements:</h5>
                        <ul>
                          {formData.measurements.map((measurement, index) => (
                            <li key={index} className="mb-2">
                              <input
                                className=" form-control d-inline w-50"
                                type="text"
                                value={measurement.name}
                                onChange={(e) => handleMeasurementChange(index, e.target.value)}
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => deleteMeasurement(measurement._id)}
                              >
                                Delete
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Success/Error Messages */}
                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                    {/* New Measurement Field */}
                    {/* <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">New Measurement</Label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          value={newMeasurementName}
                          onChange={(e) => setNewMeasurementName(e.target.value)}
                          placeholder="Enter measurement name"
                        />
                      </div>
                    </Row> */}

                    {/* Add Measurement Button */}
                    {/* <Row className="mb-3">
                      <div className="col-md-10 offset-md-2">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={addMeasurement}
                        >
                          Add Measurement
                        </button>
                      </div>
                    </Row> */}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Measurement"}
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

export default FormEditMeasurement;
