const express = require("express");
const bodyParser = require("body-parser");
const MyValidator = require("./schema");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define the Schema
let requestSchema = new MyValidator.CreateSchema({
  username: new MyValidator.string().alphanum().maxlen(10).minlen(5).required(),
  birth_year: new MyValidator.number().integer().minvalue(1980).maxvalue(2000).required(),
  age: new MyValidator.number().minvalue(10).maxvalue(50).required(),
});

let responseSchema = new MyValidator.CreateSchema({
  message: new MyValidator.string().required(),
});

// @type    -   GET
// @route   -   /
// @desc    -   sample api
// @access  -   PUBLIC
app.get("/",
  (req, res, next) => {
    // Request Validation
    let result = requestSchema.validator(req.body);
    console.log(requestSchema);
    if (result != true) {
      res.status(400).json({ error: result });
    } else {
      next();
    }
  },
  (req, res, next) => {
    //Business Logic goes here
    const message = { message: "Response Accepted!" };
    req.response = message;
    // res.send(message)
    next();
  },
  (req, res, next) => {
    // Response validation
    let result = responseSchema.validator(req.response);
    console.log(responseSchema);
    if (result != true) {
      res.status(400).json({ error: result });
    } else {
      res.json(req.response);
    }
  }
);

const port = 3000;
app.listen(port, () => console.log(`App running at ${port}`));
