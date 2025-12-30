const express = require("express"); //express framework
const app = express();   //app object control overall server
 app.use(express.json());

 let students = [];
let id = 1;
app.get("/", (req, res) => {
  res.send("Student  API");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {

      const { name, age } = req.body;

        const student = {
    id: id++,
    name,
    age,
  };

    students.push(student);
  res.json({ message: "Student added", student });
});

app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  student.name = req.body.name || student.name;
  student.age = req.body.age || student.age;
  res.json({ message: "Student updated", student });
});

app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(s => s.id !== studentId);
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


