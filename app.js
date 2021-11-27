const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public")); //express to check for files to serve for public in that folder
app.use(express.urlencoded({ extended: false }));

const htmlPageNames = [
  "index.html",
  "restaurants.html",
  "recommend.html",
  "confirm.html",
  "about.html",
];

const routeNames = ["/", "/restaurants", "/recommend", "/confirm", "/about"];

const ejsFiles = ["index", "restaurants", "recommend", "confirm", "about"];


for (let index = 0; index < ejsFiles.length; index++) {
  app.get(routeNames[index], function (req, res) {
    const filePath = path.join(__dirname, "data", "restaurant.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render(ejsFiles[index], {

      numberOfRestaurants: storedRestaurants.length,
      restaurants: storedRestaurants,
    });

    // const filePath = path.join(__dirname, "views", htmlPageNames[index]);
    // res.sendFile(filePath);
  });
}

app.post(routeNames[2], function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurant.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect(routeNames[3]);
});

app.listen(3000);
