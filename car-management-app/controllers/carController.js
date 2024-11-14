import Car from "../models/carModel.js";
import cloudinary from "../cloudinaryConfig.js";

export const createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    console.log("Backend me", title, tags, req.files);

    const images = req.files;

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.v2.uploader.upload(image.path);
        return result.secure_url;
      })
    );

    const newCar = new Car({
      title,
      description,
      tags,
      images: uploadedImages,
      user: req.user.id,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Error creating car", error });
  }
};

export const listCars = async (req, res) => {
  const cars = await Car.find({ user: req.user.id });
  res.json(cars);
};

export const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car", error });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    let images = req.files ? req.files.map((file) => file.path) : [];

    if (images.length > 0) {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.v2.uploader.upload(image);
          return result.secure_url; // Get the URL of the uploaded image
        })
      );
      images = uploadedImages; // Set the uploaded images as the new images
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { title, description, images, tags },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error });
  }
};

export const deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted successfully" });
};
