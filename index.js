const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Sample dataset
const students = [
    {
        id: 1,
        name: "Rayhana",
        yearLevel: 2,
    },
    {
        id: 2,
        name: "Hazel",
        yearLevel: 2,
    },
    {
        id: 3,
        name: "Val",
        yearLevel: 2,
    },
];

// Get all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// Get a specific student by ID
app.get('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find((student) => student.id === parseInt(id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// mag-add og bag-ong student
app.post('/api/students', (req, res) => {
    const { name, yearLevel } = req.body;
    const newStudent = { id: students.length + 1, name, yearLevel };
    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// mag-update ka sa student's details
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, yearLevel } = req.body;
    const student = students.find((student) => student.id === parseInt(id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = name || student.name;
    student.yearLevel = yearLevel || student.yearLevel;

    res.json({
        message: "Student updated successfully",
        student
    });
});

// magdelete kag student
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex((student) => student.id === parseInt(id));

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(studentIndex, 1);
    res.json({ message: "Student deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});