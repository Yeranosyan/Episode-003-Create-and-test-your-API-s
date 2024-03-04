const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

let cars = [];
let nextCarId = 1; // Initialize the counter variable

// Create a new car
app.post("/cars", (req, res) => {
  const { brand, model, year } = req.body;
  const newCar = { id: nextCarId.toString(), brand, model, year }; // Convert ID to string
  cars.push(newCar);
  nextCarId++; // Increment the counter
  res.status(201).json(newCar);
});

// Retrieve all cars
app.get("/cars", (req, res) => {
  res.render("cars", { cars });
});

// Retrieve a specific car
app.get("/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }
  res.json(car);
});

// Update a car
app.put("/cars/:id", (req, res) => {
  const { brand, model, year } = req.body;
  const carIndex = cars.findIndex((c) => c.id === req.params.id);
  if (carIndex === -1) {
    return res.status(404).json({ message: "Car not found" });
  }
  cars[carIndex] = { ...cars[carIndex], brand, model, year };
  res.json(cars[carIndex]);
});

// Delete a car
app.delete("/cars/:id", (req, res) => {
  const carIndex = cars.findIndex((c) => c.id === req.params.id);
  if (carIndex === -1) {
    return res.status(404).json({ message: "Car not found" });
  }
  cars.splice(carIndex, 1);
  res.status(204).end();
});

// Render the homepage
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
