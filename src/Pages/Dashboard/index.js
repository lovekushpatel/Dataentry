import React from "react";
import UsePanel from "./UserPanel";


import { Row, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Dashboard = () => {
  document.title = "Dashboard | Form Filling";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Form Filling" breadcrumbItem="Dashboard" />
          {/* User Panel Charts */}
          <UsePanel />

          <Row>
            {/* Overview Chart */}
            {/* <OverView /> */}
            {/* Social Source Chart */}
            {/* <SocialSource /> */}
          </Row>

          <Row>
            {/* Order Stats */}
            {/* <OrderStatus /> */}
            {/* Notifications */}
            {/* <Notifications /> */}
            {/* Revenue by Location Vector Map */}
            {/* <RevenueByLocation /> */}
          </Row>

          {/* Latest Transaction Table */}
          {/* <LatestTransation /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { Row, Container, Col, Input } from "reactstrap";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { getAllUsersWithoutSearch } from "../../Services/auth";

// const Dashboard = () => {
//   document.title = "Dashboard | Form Filling";

//   const [users, setUsers] = useState([]);
//   const [sortType, setSortType] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, [sortType]);

//   const fetchUsers = async () => {
//     try {
//       const response = await getAllUsersWithoutSearch(); // Ensure this API returns all users with createdAt and updatedAt
//       let sortedUsers = [...response?.users || []];

//       switch (sortType) {
//         case "name":
//           sortedUsers.sort((a, b) => a.fullName?.localeCompare(b.fullName));
//           break;
//         case "created":
//           sortedUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           break;
//         case "modified":
//           sortedUsers.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
//           break;
//         default:
//           break;
//       }

//       setUsers(sortedUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           <Breadcrumbs title="Form Filling" breadcrumbItem="Dashboard" />

//           {/* Sorting Filters */}
//           <Row className="mb-3">
//             <Col md={4}>
//               <Input
//                 type="select"
//                 value={sortType}
//                 onChange={(e) => setSortType(e.target.value)}
//               >
//                 <option value="">Sort Users By</option>
//                 <option value="name">Name (A-Z)</option>
//                 <option value="created">Date Created (Newest)</option>
//                 <option value="modified">Date Modified (Recent)</option>
//               </Input>
//             </Col>
//           </Row>

//           {/* User Table */}
//           <Row>
//             <Col>
//               <div className="table-responsive">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Full Name</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>Status</th>
//                       <th>Created At</th>
//                       <th>Updated At</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.length > 0 ? (
//                       users.map((user, index) => (
//                         <tr key={user._id}>
//                           <td>{index + 1}</td>
//                           <td>{user.fullName}</td>
//                           <td>{user.email}</td>
//                           <td>{user.phone}</td>
//                           <td>{user.status}</td>
//                           <td>
//                             {user.createdAt
//                               ? new Date(user.createdAt).toLocaleString()
//                               : "N/A"}
//                           </td>
//                           <td>
//                             {user.updatedAt
//                               ? new Date(user.updatedAt).toLocaleString()
//                               : "N/A"}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center">
//                           No users found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Dashboard;

