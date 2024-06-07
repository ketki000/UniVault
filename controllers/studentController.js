const db = require("../config/db");

// GET ALL STUDENTS LIST
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Records",
      totalStudents: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Student API",
      error,
    });
  }
};

// GET STUDENT BY ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid or provide Student id",
      });
    }
    //const data = await db.query(`SELECT * FROM students WHERE id = `+ studentId)
    // since direct query has chances of sql injection attack
    const data = await db.query(`SELECT * FROM students WHERE id=?`, [
      studentId,
    ]); //secure in array
    if (!data) {
      return res.status(404).send({
        success: false,
        message: " No records found ",
      });
    }
    res.status(200).send({
      success: true,
      studentDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get student by id",
      error,
    });
  }
};

//CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    const { name, roll_no, fees, classs, medium } = req.body;

    if (!name || !roll_no || !classs || !medium || !fees) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const data = await db.query(
      `INSERT INTO students (name, roll_no, fees, classs, medium) VALUES (?, ?, ?, ?, ?)`,
      [name, roll_no, fees, classs, medium]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in Insert Query",
      });
    }
    res.status(201).send({
      success: true,
      message: "New student record created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Create Student api",
      error,
    });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id or provide id",
      });
    }

    const { name, roll_no, fees, classs, medium } = req.body;
    //Validation
    if (!name || !roll_no || !classs || !medium || !fees) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const data = await db.query(
      `UPDATE students SET name = ? , roll_no = ?, fees = ?, classs = ?, medium = ? WHERE id = ?`,
      [name, roll_no, fees, classs, medium, studentId]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error in updating data",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student details updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Update Student API",
      error,
    });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id or provide id",
      });
    }
    await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);
    res.status(200).send({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Student API",
      error,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
