const express = require("express");
var morgan = require("morgan");
const cors = require("cors");

app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("----");
  next();
};
app.use(requestLogger);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body",
    {
      skip: function (req, res) {
        return !(req.method === "POST");
      },
    }
  )
);
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const len = persons.length;
  const date = new Date();
  console.log(date);

  res.send(
    `<h1>Phonebook has info for ${len} people</h1>
        <p>${date}</p>
        `
  );
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id == req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter((p) => p.id != req.params.id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  body = req.body;

  if (body.name == undefined) {
    return res.status(400).json({
      error: "must include a valid name",
    });
  }

  if (body.number == undefined) {
    return res.status(400).json({
      error: "must include a valid number",
    });
  }

  const person = persons.find((p) => p.name === body.name);
  if (person) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const entry = {
    name: body.name,
    number: body.number,
    id: String(Math.random() * 999999),
  };
  persons = persons.concat(entry);

  res.json(entry);
});

const unknownEndPoint = (req, res, next) => {
  // console.log("UNKNOWN ENDPOINT HIT:", req.method, req.path);
  res.status(404).send({ error: "The endpoint does not exist" });
};
app.use(unknownEndPoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
