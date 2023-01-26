const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var restaurants = [
  { id: 123, name: "Halal Foods" },
  { id: 345, name: "Yams and Soup" },
  { id: 522, name: "El Fisho" },
];

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});
app.post("/restaurant", (req, res) => {
  restaurants.push({ id: req.body.id, name: req.body.name });
  res.send(`${JSON.stringify(restaurants)} -> added`);
});
app.delete("/restaurant/:id", (req, res) => {
  res.send(`Restaurant with id = ${req.params.id} deleted`);
});

app.patch("/restaurant/:id", (req, res) => {
  const id = req.params.id * 1;
  const restaurantToUpdate = restaurants.find((el) => el.id === id);
  const updatedRestaurantObject = { ...restaurantToUpdate, ...req.body };
  restaurantToUpdate = updatedRestaurantObject;

  res.send("restaurant updated:" + JSON.stringify(restaurants));
});

app.listen(4000, () => console.log("Listening on 4000"));
