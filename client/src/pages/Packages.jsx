import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, Button, Typography, Tag, Row, Col, Flex } from "antd";
import {
  ShoppingCartOutlined,
  EyeOutlined,
  EditFilled,
} from "@ant-design/icons";

import { Grid } from "antd";
const { Meta } = Card;

import { format } from "date-fns";
import { NavLink, useNavigate } from "react-router-dom";
const { Text, Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [userPackage, setUserPackage] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userDetails"));

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API}/api/packages`);
      setPackages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPackagesByUser = async () => {
    try {
      const response = await axios.get(
        `${API}/api/packages/package-by-user/${user.id}`
      );
      setUserPackage(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchPackagesByUser();
  }, []);

  console.log("packages by user:", userPackage);
  console.log("packages:", packages);

  const handleSubmit = async (packageId) => {
    const formData = {
      userId: user.id,
      packageId: packageId,
    };

    try {
      const response = await axios.post(
        `${API}/api/packages/buy-package`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = { ...user, PackageId: packageId };
        localStorage.setItem("userDetails", JSON.stringify(updatedUser));
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("userDetails");
          navigate("/login");
        } else if (error.response.data?.error) {
          alert(error.response.data.error);
        }
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      const response = await axios.delete(
        `${API}/api/packages/delete-package/${packageId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        fetchPackages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Row gutter={[60, 50]} justify="space-between">
        {packages.map((packageInfo, index) => {
          return (
            <Col key={index}>
              <Card
                style={{
                  width: 350,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                cover={
                  <img
                    alt="product"
                    src="https://via.placeholder.com/300x200"
                    style={{
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                }
              >
                <Meta
                  title={
                    <Title
                      level={4}
                      style={{
                        marginBottom: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {packageInfo.title}

                      {user.role === "user" &&
                        userPackage?.id === packageInfo.id && (
                          <Tag
                            color={packageInfo.isActive ? "green" : "volcano"}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {packageInfo.isActive ? "Active" : "Expired"}
                          </Tag>
                        )}

                      {user.role === "admin" && (
                        <NavLink to="/update-package" state={{ packageInfo }}>
                          <EditFilled className="edit-btn" />
                        </NavLink>
                      )}
                    </Title>
                  }
                  description={
                    <div>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {packageInfo.description}
                      </Text>
                      <div style={{ marginTop: "12px" }}>
                        <Tag
                          color="green"
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          ${packageInfo.price}
                        </Tag>
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "12px",
                            color: "#555",
                          }}
                        >
                          <Text>
                            From:{" "}
                            {format(
                              new Date(packageInfo.fromDate),
                              "MM/dd/yyyy"
                            )}
                          </Text>
                          <br />
                          <Text>
                            To:{" "}
                            {format(new Date(packageInfo.toDate), "MM/dd/yyyy")}
                          </Text>
                        </div>
                      </div>
                    </div>
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  {user.role === "admin" && (
                    <Button
                      type="primary"
                      color="danger"
                      variant="outlined"
                      style={{ borderRadius: "8px" }}
                      onClick={() => handleDeletePackage(packageInfo.id)}
                    >
                      Delete Package
                    </Button>
                  )}

                  {user.role === "user" && (
                    <>
                      {userPackage?.id === packageInfo?.id ? (
                        <NavLink to="/package-details" state={{ packageInfo }}>
                          <Button
                            type="default"
                            icon={<EyeOutlined />}
                            style={{ borderRadius: "8px" }}
                          >
                            View
                          </Button>
                        </NavLink>
                      ) : (
                        <Button
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          style={{ borderRadius: "8px" }}
                          onClick={() => handleSubmit(packageInfo.id)}
                        >
                          Buy Now
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Flex>
  );
};

export default Packages;
