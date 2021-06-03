const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const history = require("connect-history-api-fallback");
const morgan = require("morgan");
const path = require("path");

const app = express();

const questionRoute = require("./server/routes/questions.routes");

app.use(bodyParser.json());

morgan.token("id", function getId(req) {
  return req.id;
});
app.use(morgan(":id :method :url :response-time"));

connect(
  "mongodb+srv://vergo:psychopassport@cluster0.1g1td.mongodb.net/psychoTestDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://yourapp.com",
];

let corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({ extended: true }));
console.log("Process env = ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  //static must go after history
  app.use(history());
  app.use(express.static(path.join(__dirname, "dist")));
}

app.use("/api/questions", questionRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080 || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
