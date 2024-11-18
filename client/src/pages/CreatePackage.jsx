import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import axios from "axios";

const { Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const CreatePackage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const user = JSON.parse(localStorage.getItem("userDetails"));

  console.log("users", user);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API}/api/packages/`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 201) {
        messageApi.open({
          type: "success",
          content: "This is a success message",
        });
        navigate("/packages");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: 600,
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#1890ff" }}>
          Create Package
        </Title>

        <Form
          name="register"
          initialValues={{ remember: true }}
          style={{ marginTop: "1rem" }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "title is required" }]}
            label="Title"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Package Title"
              size="large"
              name="title"
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
            label="Description"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Package Description"
              size="large"
              name="description"
            />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: "Price is required!" }]}
            label="Price"
          >
            <Input
              prefix={<DollarOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Price"
              size="large"
              name="price"
            />
          </Form.Item>

          <Form.Item
            name="fromDate"
            rules={[{ required: true, message: "Please input your password!" }]}
            label="From Date"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="toDate"
            rules={[{ required: true, message: "Please input your password!" }]}
            label="To Date"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item style={{ marginTop: "1.5rem" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Create Package
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePackage;
