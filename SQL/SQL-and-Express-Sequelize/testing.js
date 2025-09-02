const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

const sequelize = new Sequelize("mysql://root:@localhost/sql_intro", {
  logging: false,
});

const Student = sequelize.define(
  "Student",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    s_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_brilliant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "student", timestamps: false }
);

const Teacher = sequelize.define(
  "Teacher",
  {
    t_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    t_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_tenured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "teacher", timestamps: false }
);

const StudentTeacher = sequelize.define(
  "StudentTeacher",
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: "s_id",
      },
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Teacher,
        key: "t_id",
      },
    },
  },
  { tableName: "student_teacher", timestamps: false }
);

const addStudent = async (name, isBrilliant) => {
  const student = await Student.create({
    s_name: name,
    is_brilliant: !!isBrilliant,
  });
  return student.s_id;
};

const addTeacher = async (name, isTenured) => {
  const teacher = await Teacher.create({
    t_name: name,
    is_tenured: !!isTenured,
  });
  return teacher.t_id;
};

const enrollStudent = async (studentName, teacherName) => {
  const studentData = await sequelize.query(
    `SELECT s_id FROM student WHERE s_name = :name`,
    { replacements: { name: studentName }, type: QueryTypes.SELECT }
  );

  const teacherData = await sequelize.query(
    `SELECT t_id FROM teacher WHERE t_name = :name`,
    { replacements: { name: teacherName }, type: QueryTypes.SELECT }
  );

  if (!studentData[0] || !teacherData[0]) return;

  const studentId = studentData[0].s_id;
  const teacherId = teacherData[0].t_id;

  await sequelize.query(
    `INSERT INTO student_teacher (student_id, teacher_id) VALUES (:studentId, :teacherId)`,
    { replacements: { studentId, teacherId }, type: QueryTypes.INSERT }
  );

  console.log(`Enrolled student ${studentName} with teacher ${teacherName}`);
};

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");

    await sequelize.sync({ force: true });
    console.log("All tables created successfully.");

    const studentId = await addStudent("Leonidis", 1);
    const teacherId = await addTeacher("Yoda", 0);
    console.log("New student ID:", studentId);
    console.log("New teacher ID:", teacherId);

    await enrollStudent("Leonidis", "Yoda");

    const students = await Student.findAll();
    console.log(
      "Students:",
      students.map((s) => s.toJSON())
    );

    const teachers = await Teacher.findAll();
    console.log(
      "Teachers:",
      teachers.map((t) => t.toJSON())
    );

    const enrollments = await StudentTeacher.findAll();
    console.log(
      "Enrollments:",
      enrollments.map((e) => e.toJSON())
    );
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
};

main();
