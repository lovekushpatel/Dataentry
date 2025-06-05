  // import React, { useState, useEffect } from "react";
  // import { useParams } from "react-router-dom";
  // import {
  //   Card,
  //   CardBody,
  //   Col,
  //   Row,
  //   Container,
  //   Alert,
  // } from "reactstrap";
  // import Breadcrumbs from "../../components/Common/Breadcrumb";
  // import { getbyidUser, updateByIDUser } from "../../Services/auth";

  // const FromEditUsers = () => {
  //   document.title = "Edit User | Form Filling";
  //   const { id } = useParams();
  //   const [formData, setFormData] = useState({
  //     fullName: "",
  //     email: "",
  //     phone: "",
  //   });

  //   const [loading, setLoading] = useState(true);
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const response = await getbyidUser(id);
  //         const userData = response?.user;

  //         setFormData({
  //           fullName: userData?.fullName || "",
  //           email: userData?.email || "",
  //           phone: userData?.phone || "",
          
  //         });

  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching user details:", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchUser();
  //   }, [id]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsSubmitting(true);

  //     try {
  //       const response = await updateByIDUser(id,formData);

  //       if (response) {
  //         setSuccessMessage("User updated successfully");
  //         setErrorMessage("");
  //       } else {
  //         setErrorMessage("Error updating user");
  //       }
  //     } catch (error) {
  //       console.error("Error updating user:", error);
  //       setSuccessMessage("");
  //       setErrorMessage("Error updating user");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <React.Fragment>
  //       <div className="page-content">
  //         <Container fluid={true}>
  //           <Breadcrumbs title="Users" breadcrumbItem="Edit User" />
  //           <Row>
  //             <Col>
  //               <Card>
  //                 <CardBody>
  //                   <form onSubmit={handleSubmit}>
  //                     <Row className="mb-3">
  //                       <label htmlFor="fullName" className="col-md-2 col-form-label">Name</label>
  //                       <div className="col-md-12">
  //                         <input className="form-control" type="text" id="fullName" name="fullName"
  //                           value={formData.fullName} onChange={handleChange} required />
  //                       </div>
  //                     </Row>

  //                     <Row className="mb-3">
  //                       <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
  //                       <div className="col-md-12">
  //                         <input className="form-control" type="email" id="email" name="email"
  //                           value={formData.email} onChange={handleChange} required />
  //                       </div>
  //                     </Row>

  //                     <Row className="mb-3">
  //                       <label htmlFor="phone" className="col-md-2 col-form-label">Phone</label>
  //                       <div className="col-md-12">
  //                         <input className="form-control" type="number" id="phone" name="phone"
  //                           value={formData.phone} onChange={handleChange} required />
  //                       </div>
  //                     </Row>

              

  //                     {successMessage && <Alert color="success">{successMessage}</Alert>}
  //                     {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

  //                     <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
  //                       {isSubmitting ? "Adding..." : "Add"}
  //                     </button>
  //                   </form>
  //                 </CardBody>
  //               </Card>
  //             </Col>
  //           </Row>
  //         </Container>
  //       </div>
  //     </React.Fragment>
  //   );
  // };

  // export default FromEditUsers;



  import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getbyidUser, updateByIDUser } from "../../Services/auth";

const FromEditUsers = () => {
  document.title = "Edit User | Form Filling";
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: ""
  });

  const [oldDates, setOldDates] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateChangeMessage, setDateChangeMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getbyidUser(id);
        const userData = response?.user;

        setFormData({
          fullName: userData?.fullName || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          startDate: userData?.startDate ? userData.startDate.slice(0,10) : "",  // yyyy-mm-dd format
          endDate: userData?.endDate ? userData.endDate.slice(0,10) : ""
        });
        setOldDates({
          startDate: userData?.startDate ? userData.startDate.slice(0,10) : "",
          endDate: userData?.endDate ? userData.endDate.slice(0,10) : ""
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if startDate or endDate changed and show message
    if ((name === "startDate" && value !== oldDates.startDate) ||
        (name === "endDate" && value !== oldDates.endDate)) {
      let message = "Date changed:\n";

      if (name === "startDate") {
        message += `Start Date: ${oldDates.startDate} → ${value}\n`;
      }
      if (name === "endDate") {
        message += `End Date: ${oldDates.endDate} → ${value}\n`;
      }
      setDateChangeMessage(message);
    } else {
      setDateChangeMessage("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDateChangeMessage("");  // Clear alert on submit

    try {
      const response = await updateByIDUser(id, formData);

      if (response) {
        setSuccessMessage("User updated successfully");
        setErrorMessage("");
        // Update oldDates after successful save
        setOldDates({
          startDate: formData.startDate,
          endDate: formData.endDate
        });
      } else {
        setErrorMessage("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setSuccessMessage("");
      setErrorMessage("Error updating user");
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
          <Breadcrumbs title="Users" breadcrumbItem="Edit User" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label htmlFor="fullName" className="col-md-2 col-form-label">Name</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" id="fullName" name="fullName"
                          value={formData.fullName} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
                      <div className="col-md-12">
                        <input className="form-control" type="email" id="email" name="email"
                          value={formData.email} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="phone" className="col-md-2 col-form-label">Phone</label>
                      <div className="col-md-12">
                        <input className="form-control" type="number" id="phone" name="phone"
                          value={formData.phone} onChange={handleChange} required />
                      </div>
                    </Row>

                    {/* New fields startDate & endDate */}
                    <Row className="mb-3">
                      <label htmlFor="startDate" className="col-md-2 col-form-label">Start Date</label>
                      <div className="col-md-12">
                        <input className="form-control" type="date" id="startDate" name="startDate"
                          value={formData.startDate} onChange={handleChange} />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="endDate" className="col-md-2 col-form-label">End Date</label>
                      <div className="col-md-12">
                        <input className="form-control" type="date" id="endDate" name="endDate"
                          value={formData.endDate} onChange={handleChange} />
                      </div>
                    </Row>

                    {dateChangeMessage && <Alert color="warning" style={{whiteSpace: "pre-wrap"}}>{dateChangeMessage}</Alert>}
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

export default FromEditUsers;

