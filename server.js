const express = require("express");
const  route  = require("./Routes/FormRouter");

const cors = require("cors");
const port = 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(express.static("/uploads"));
app.get("/", (req, res) => {
  res.send("Hey");
});
app.use("/api", route);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
