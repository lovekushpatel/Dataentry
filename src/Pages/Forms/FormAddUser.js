import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addUser } from "../../Services/auth";

const FormAddUser = () => {
  document.title = "Add Users | Form Filling";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    remark: "",
    projectName: "",
    branchName: ""
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
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await addUser(formData);
      console.log("API Response:", response);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        remark: "",
        projectName: "",
        branchName: ""
      });

      setSuccessMessage(response?.msg || "User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage(error?.msg || "Error adding user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="Add Users" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Name</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Email</label>
                      <div className="col-md-12">
                        <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Phone</label>
                      <div className="col-md-12">
                        <input className="form-control" type="number" name="phone" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Password</label>
                      <div className="col-md-12">
                        <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Start Date</label>
                      <div className="col-md-12">
                        <input className="form-control" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">End Date</label>
                      <div className="col-md-12">
                        <input className="form-control" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                      </div>
                    </Row>

                  <Row className="mb-3">
  <label className="col-md-2 col-form-label">Start Time</label>
  <div className="col-md-12">
    <input 
      className="form-control" 
      type="time" 
      name="startTime" 
      value={formData.startTime} 
      onChange={handleChange}
      required
    />
  </div>
</Row>

<Row className="mb-3">
  <label className="col-md-2 col-form-label">End Time</label>
  <div className="col-md-12">
    <input 
      className="form-control" 
      type="time" 
      name="endTime" 
      value={formData.endTime} 
      onChange={handleChange}
      required
    />
  </div>
</Row>
                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Remark</label>
                      <div className="col-md-12">
                        <textarea className="form-control" name="remark" rows="3" value={formData.remark} onChange={handleChange}></textarea>
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Project Name</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Branch Name</label>
                      <div className="col-md-12">
                        <input className="form-control" type="text" name="branchName" value={formData.branchName} onChange={handleChange} required />
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

export default FormAddUser;





// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Col, Row, Container, Alert } from "reactstrap";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { addUser } from "../../Services/auth";

// const FormAddUser = () => {
//   document.title = "Add Users | Form Filling";

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     startDate: "",
//     endDate: "",
//     remark: ""
//   });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     // Auto-fill current time in HH:MM:SS format
// const getCurrentTime = () => {
//   const now = new Date();
//   return now.toLocaleTimeString("en-GB", {
//     hour12: false,
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit"
//   });
// };

// const payload = {
//   ...formData,
//   startTime: getCurrentTime(),
//   endTime: getCurrentTime()
// };


//     try {
//       const response = await addUser(payload);
//       console.log("API Response:", response);

//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         password: "",
//         startDate: "",
//         endDate: "",
//         remark: ""
//       });
//       setSuccessMessage(response?.message || "User added successfully!");
//     } catch (error) {
//       console.error("Error adding user:", error);
//       setErrorMessage(error?.message || "Error adding user. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <Breadcrumbs title="Users" breadcrumbItem="Add Users" />
//         <Row>
//           <Col>
//             <Card>
//               <CardBody>
//                 <form onSubmit={handleSubmit}>
//                   {/* Name */}
//                   <Row className="mb-3">
//                     <label htmlFor="fullName" className="col-md-2 col-form-label">Name</label>
//                     <div className="col-md-12">
//                       <input className="form-control" type="text" id="fullName" name="fullName"
//                         value={formData.fullName} onChange={handleChange} required />
//                     </div>
//                   </Row>

//                   {/* Email */}
//                   <Row className="mb-3">
//                     <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
//                     <div className="col-md-12">
//                       <input className="form-control" type="email" id="email" name="email"
//                         value={formData.email} onChange={handleChange} required />
//                     </div>
//                   </Row>

//                   {/* Phone */}
//                   <Row className="mb-3">
//                     <label htmlFor="phone" className="col-md-2 col-form-label">Phone</label>
//                     <div className="col-md-12">
//                       <input className="form-control" type="number" id="phone" name="phone"
//                         value={formData.phone} onChange={handleChange} required />
//                     </div>
//                   </Row>

//                   {/* Password */}
//                   <Row className="mb-3">
//                     <label htmlFor="password" className="col-md-2 col-form-label">Password</label>
//                     <div className="col-md-12">
//                       <input className="form-control" type="password" id="password" name="password"
//                         value={formData.password} onChange={handleChange} required />
//                     </div>
//                   </Row>

//                   {/* Start Date */}
//                   <Row className="mb-3">
//                     <label htmlFor="startDate" className="col-md-2 col-form-label">Start Date</label>
//                     <div className="col-md-12">
//                       <input className="form-control" type="date" id="startDate" name="startDate"
//                         value={formData.startDate} onChange={handleChange} />
//                     </div>
//                   </Row>

//                   {/* End Date */}
//                   <Row className="mb-3">
//                     <label htmlFor="endDate" className="col-md-2 col-form-label">End Date</label>
//                     <div className="col-md-12">
//                       <input className="form-control" type="date" id="endDate" name="endDate"
//                         value={formData.endDate} onChange={handleChange} />
//                     </div>
//                   </Row>

//                   {/* Remark */}
//                   <Row className="mb-3">
//                     <label htmlFor="remark" className="col-md-2 col-form-label">Remark</label>
//                     <div className="col-md-12">
//                       <textarea className="form-control" id="remark" name="remark"
//                         value={formData.remark} onChange={handleChange} rows="3"></textarea>
//                     </div>
//                   </Row>

//                   {/* Alerts and Submit */}
//                   {successMessage && <Alert color="success">{successMessage}</Alert>}
//                   {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

//                   <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                     {isSubmitting ? "Adding..." : "Add"}
//                   </button>
//                 </form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default FormAddUser;
