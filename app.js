 const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
require("./controller/employeController")(app);

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});