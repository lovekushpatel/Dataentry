import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import RadialChart1 from "./userpanelChart1";
import axios from "axios";
import { getAllTaskWithoutSearch, getAllUsers, getAllUsersWithoutSearch, getAllZips } from "../../Services/auth";

const UserPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalZips, setTotalZips] = useState(0);
  const [totalTask, setTotalTask] = useState(0);


  useEffect(() => {
    const fetchUsersData = async () => {
      try {
      const userResponse = await getAllUsersWithoutSearch()

        console.log(userResponse.totalUsers, "totalUsers")
        setTotalUsers(userResponse.totalUsers);

      


        const zipsResponse = await getAllZips()

        console.log(zipsResponse.length, "zipsResponse")
        setTotalZips(zipsResponse?.length);


        const taskResponse = await getAllTaskWithoutSearch()

        console.log(taskResponse?.data, "taskResponse")
        setTotalTask(taskResponse?.data?.length);

       
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUsersData();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col xl={12} sm={12}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalUsers]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Users</p>
                  <h5 className="mb-3">{totalUsers}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={12} sm={12}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-2" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalZips]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Files</p>
                  <h5 className="mb-3">{totalZips}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={12} sm={12}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-3" className="apex-charts" dir="ltr">
                    <RadialChart1 series={[totalTask]} />
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Task Done</p>
                  <h5 className="mb-3">{totalTask}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;

// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Col, Row } from "reactstrap";
// import { getAllUsers } from "../../Services/auth";

// const UsePanel = ({ sortOption }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getAllUsers();
//         setUsers(response?.users?.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     // Apply sorting when sortOption or users change
//     const sortedUsers = [...users];
    
//     switch(sortOption) {
//       case 'name':
//         sortedUsers.sort((a, b) => a.fullName.localeCompare(b.fullName));
//         break;
//       case 'nameDesc':
//         sortedUsers.sort((a, b) => b.fullName.localeCompare(a.fullName));
//         break;
//       case 'dateCreated':
//         sortedUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         break;
//       case 'dateCreatedDesc':
//         sortedUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//         break;
//       case 'dateModified':
//         sortedUsers.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
//         break;
//       case 'dateModifiedDesc':
//         sortedUsers.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
//         break;
//       default:
//         break;
//     }
    
//     setFilteredUsers(sortedUsers);
//   }, [users, sortOption]);

//   return (
//     <Row>
//       <Col xl={12}>
//         <Card>
//           <CardBody>
//             <h4 className="card-title mb-4">User Statistics</h4>
            
//             {/* Display filtered/sorted users */}
//             <div className="table-responsive">
//               <table className="table table-centered mb-0">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Created At</th>
//                     <th>Updated At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUsers.map(user => (
//                     <tr key={user._id}>
//                       <td>{user.fullName}</td>
//                       <td>{user.email}</td>
//                       <td>
//                         <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
//                           {user.status}
//                         </span>
//                       </td>
//                       <td>{new Date(user.createdAt).toLocaleString()}</td>
//                       <td>{new Date(user.updatedAt).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardBody>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default UsePanel;
