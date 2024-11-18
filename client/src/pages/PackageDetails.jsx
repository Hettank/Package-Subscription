import { Check } from "@phosphor-icons/react";
import { Button, Card, Col, Row } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

const PackageDetails = () => {
  const location = useLocation();
  const { packageInfo } = location.state;

  return (
    <div className="package-detail-container">
      <div className="package-info">
        <h1>{packageInfo.title}</h1>
        <p className="desc">{packageInfo.description}</p>
      </div>

      <div className="package-content-container">
        <div className="box-header">
          <h2>Package Overview</h2>
          <p>
            A subscription package with essential features. Perfect for
            individuals and small teams.
          </p>
        </div>

        <div className="box-body">
          <p className="package-title">Features</p>
          <div className="box-items">
            <div className="box-item">
              <Check size={20} />
              <p>5 Projects</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>Basic Analytics</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>24/7 Support</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>Email Notification</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>API Access</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>Community Forum</p>
            </div>
          </div>
        </div>

        <div className="box-body">
          <p className="package-title">Package Details</p>
          <div className="box-items">
            <div className="box-item">
              <Check size={20} />
              <p>5 Projects</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>Basic Analytics</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>24/7 Support</p>
            </div>
            <div className="box-item">
              <Check size={20} />
              <p>Email Notification</p>
            </div>
          </div>
        </div>
        {packageInfo.isActive ? (
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              Status: <span className="active">Active</span>
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "1.1rem" }}>
              Status: <span className="inactive">Expired</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;
