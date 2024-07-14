import { Col, Row, Modal } from "antd";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import "./GeneralChange.css";

const GeneralChange = () => {
  const { user, setUser } = ChatState();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSaveName = () => {
    // Show confirmation modal
    setIsModalVisible(true);
  };

  const handleConfirmUpdateName = async () => {
    // Add your API call logic here to save the name
    try {
      const response = await fetch("/api/user/update-name", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Name updated successfully", data);
        // Update the localStorage with the new name
        const updatedUser = { ...user, name };
        localStorage.setItem("chat-user", JSON.stringify(updatedUser));
        // Update the user context state if needed
        setUser(updatedUser);
        setIsEditingName(false);
      } else {
        console.error("Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCancelUpdateName = () => {
    setIsModalVisible(false);
  };

  const handleSaveEmail = () => {
    // Add your save logic here
    setIsEditingEmail(false);
  };

  return (
    <div className="general">
      <div className="general-container">
        <Row className="row-style">
          <Col span={8}>Name</Col>
          <Col span={8}>
            {isEditingName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-change"
              />
            ) : (
              <p style={{ margin: 0, padding: 10 }}>{name}</p>
            )}
          </Col>
          <Col span={8} className="col-style">
            {isEditingName ? (
              <button onClick={handleSaveName}>Save</button>
            ) : (
              <button onClick={() => setIsEditingName(true)}>Edit</button>
            )}
          </Col>
        </Row>
        <Row className="row-style">
          <Col span={8}>Email</Col>
          <Col span={8}>
            {isEditingEmail ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p style={{ margin: 0, padding: 10 }}>{email}</p>
            )}
          </Col>
          <Col span={8} className="col-style">
            {isEditingEmail ? (
              <button onClick={handleSaveEmail}>Save</button>
            ) : (
              <button onClick={() => setIsEditingEmail(true)}>Edit</button>
            )}
          </Col>
        </Row>
      </div>

      <Modal
        title="Confirm Update"
        visible={isModalVisible}
        onOk={handleConfirmUpdateName}
        onCancel={handleCancelUpdateName}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to update your name?</p>
      </Modal>
    </div>
  );
};

export default GeneralChange;
