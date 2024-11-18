import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/auth/login`, formData);

      localStorage.setItem("userDetails", JSON.stringify(response.data.user));

      if (response.status === 200) {
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <Flex
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
          Login
        </Title>

        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ marginTop: "1rem" }}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            label="Username"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              size="large"
              onChange={handleChange}
              name="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            label="Password"
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              size="large"
              onChange={handleChange}
              name="password"
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
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <NavLink to="/register">Create an account? Register</NavLink>
        </div>
      </Card>
    </Flex>
  );
};

export default Login;
