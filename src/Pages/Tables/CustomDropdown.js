import React from "react";
import { Button, DropdownMenu, DropdownItem } from "reactstrap";

const CustomDropdown = ({ order, isOpen, toggleDropdown, handleStatusChange }) => {
  return (
    <div className="custom-dropdown">
      <Button
        onClick={() => toggleDropdown(order._id)} 
        className="dropdown-toggle"
        style={{ width: '150px', textAlign: 'center' }}
      >
        {order.status}
      </Button>
      {isOpen && (
        <div className="dropdown-menu">
          <DropdownItem onClick={() => handleStatusChange(order._id, "inProgress")}>Pending</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(order._id, "done")}>Done</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(order._id, "failed")}>Failed</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(order._id, "delivered")}>Delivered</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(order._id, "duePayment")}>Due Payment</DropdownItem>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
