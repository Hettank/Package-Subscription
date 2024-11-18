import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import axios from "axios";

import moment from "moment";

const { Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const UpdatePackage = () => {
  const [form] = Form.useForm();
  const location = useLocation();

  const { packageInfo } = location.state || {};

  //   console.log(packageInfo);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.put(
        `${API}/api/packages/update-package/${packageInfo.id}`,
        values
      );

      if (response.status === 200) {
        alert("Package Updated Successfully");
        navigate("/packages");
      }
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
          Update Package
        </Title>

        <Form
          form={form}
          name="update_package"
          initialValues={{
            title: packageInfo?.title,
            description: packageInfo?.description,
            price: packageInfo?.price,
            fromDate: packageInfo?.fromDate
              ? moment(packageInfo.fromDate)
              : null,
            toDate: packageInfo?.toDate ? moment(packageInfo.toDate) : null,
          }}
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: "1rem" }}
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
              value={packageInfo.title}
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
              value={packageInfo.description}
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
              value={packageInfo.price}
              name="price"
            />
          </Form.Item>

          <Form.Item
            name="fromDate"
            rules={[{ required: true, message: "Please input your password!" }]}
            label="From Date"
          >
            <DatePicker
              style={{ width: "100%" }}
              value={packageInfo.fromDate}
              name="fromDate"
            />
          </Form.Item>

          <Form.Item
            name="toDate"
            rules={[{ required: true, message: "Please input your password!" }]}
            label="To Date"
          >
            <DatePicker
              style={{ width: "100%" }}
              value={packageInfo.toDate}
              name="toDate"
            />
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
              Update Package
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdatePackage;
