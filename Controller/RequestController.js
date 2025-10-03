import Request from "../Model/RequestModel.js";
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addRequest = async (req, res) => {
  try {
    const Contact_Details = JSON.parse(req.body.Contact_Details);
    const Service_details = JSON.parse(req.body.Service_details);
    const Availability = JSON.parse(req.body.Availability);

    // Validate at least one service is selected
    const atLeastOneService =
      Service_details.Tree_Removal ||
      Service_details.Tree_Trimming ||
      Service_details.Palm_Trimming ||
      Service_details.Hurricane_Preparation ||
      Service_details.Root_Health ||
      Service_details.Tree_Maintenance_Planning;

    if (!atLeastOneService) {
      // Delete uploaded files before responding with error
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          const filepath = path.join(__dirname, '../public/uploads', file.filename);
          fs.unlink(filepath, err => {
            if (err) console.error('Error deleting file:', filepath, err);
          });
        });
      }
      return res.status(400).json({ message: "Please select at least one service" });
    }

    const images = req.files || [];
    const imageFilenames = images.map(file => file.filename);

    const newRequest = new Request({
      Contact_Details,
      Address: req.body.Address ? JSON.parse(req.body.Address) : {},
      Service_details,
      Availability,
      Images: imageFilenames,
      Status: req.body.Status || "Pending"
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);

  } catch (error) {
    // On any error, delete uploaded files to clean up
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const filepath = path.join(__dirname, '../public/uploads', file.filename);
        fs.unlink(filepath, err => {
          if (err) console.error('Error deleting file:', filepath, err);
        });
      });
    }
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();

    res.status(200).json({
      message: "Requests fetched successfully",
      requests: requests,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await Request.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(id, { Status }, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

export { addRequest, getRequests, deleteRequest, updateRequest };