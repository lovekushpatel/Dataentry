import React from "react";
import { Container, Card, CardBody, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormViewUser = () => {
  return (
    <Container fluid>
      {/* Profile Section */}
      <Card className="mt-4 shadow-sm">
        <CardBody>
          <h4 className="mb-3">Profile</h4>
          <div className="row">
            <div className="col-md-4"><b>Right:</b> 0</div>
            <div className="col-md-4"><b>Wrong:</b> 178</div>
            <div className="col-md-4"><b>Project Type:</b> ACTIVE</div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4"><b>Created At:</b> 31-12-2024, 3:36 PM</div>
            <div className="col-md-4"><b>Start Date:</b> 31-12-2024, 3:35 PM</div>
            <div className="col-md-4"><b>End Date:</b> 14-01-2025, 5:00 PM</div>
          </div>
        </CardBody>
      </Card>
      
      {/* Project Section */}
      <Card className="mt-4 shadow-sm">
        <CardBody>
          <h4 className="mb-3">Project</h4>
          <Table bordered responsive>
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Serial No</th>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Initial</th>
                <th>Email</th>
                {/* <th>Spelling Mistakes</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>15</td>
                <td>Prof.</td>
                <td style={{ color: 'green' }}>Maria</td>
                <td>McKya<br></br><span style={{ color: 'red' }}>McKya</span></td>
                <td>Riggins<br></br><span  style={{ color: 'red' }}>Rigings</span></td>
                <td><span style={{ color: 'green' }}>mariamckay@optonline.net</span></td>
                {/* <td><span style={{ color: 'red' }}>McKya</span></td> */}
              </tr>
              <tr>
                <td>2</td>
                <td>3</td>
                <td>Mrs.</td>
                <td>Bernard</td>
                <td><span style={{ color: 'red' }}>Wiae</span></td>
                <td>Villareal</td>
                <td><span style={{ color: 'green' }}>bernardwise@gmail.com</span></td>
                {/* <td><span style={{ color: 'red' }}>Wiae</span></td> */}
              </tr>
              <tr>
                <td>3</td>
                <td>4</td>
                <td>Sir.</td>
                <td>Ayleen</td>
                <td><span style={{ color: 'red' }}>Pinna</span></td>
                <td>Turpin</td>
                <td><span style={{ color: 'green' }}>ayleenpina@acadiaca.ca</span></td>
                {/* <td><span style={{ color: 'red' }}>Pinna</span></td> */}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default FormViewUser;
