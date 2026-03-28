import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "./db.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

// register

app.post("/register", async (req, res) => {
    const { username, password, role } = req.body


    const user = await pool.query(
        "SELECT* FROM Users WHERE Username=$1",
        [username],
    );

    if (user.rows.length > 0) {
        return res.json({ success: false, message: "user exists" })
    };

    const Hashed = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (username,password,role) VALUES($1,$2,$3)",
        [username, Hashed, "student"]
    );

    res.json({ success: true, message: "sucessfullyregsitered" });
});





// app.post("/login", async (req, res) => {
//     const { username, password } = req.body
//     const result = await pool.query(
//         "SELECT * FROM users WHERE username=$1",
//         [username]
//     );
//     if (result.rows.length === 0) {
//         return res.json({ success: false, message: "no users found" })
//     }

//     const user = result.rows[0];

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         return res.json({ success: false, message: "password is wrong" })
//     };
//     const token = jwt.sign(
//         { id: user.id, role: user.role }, SECRET
//     );

//     res.json({ success: true, token,})

// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (result.rows.length === 0) {
    return res.json({ success: false, message: "no users found" });
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ success: false, message: "password is wrong" });
  }


  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    SECRET
  );

  res.json({ success: true, token });
});
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
// app.get("/student/:username", async (req, res) => {
//   const { username } = req.params;

//   const result = await pool.query(
//     "SELECT id, username, role FROM users WHERE username=$1",
//     [username]
//   );

//   res.json(result.rows[0]);
// });
app.get("/student/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM studentss WHERE username=$1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No student data found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/set-role", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, SECRET);

    if (decoded.role !== "admin") {
        return res.json({ success: false, message: "Only admin allowed" });
    }

    const { username, role } = req.body;





    const result = await pool.query(
        "UPDATE users SET role=$1 WHERE username=$2 RETURNING *",
        [role, username]
    );
    if (result.rows.length === 0) {
        return res.json({ success: false, message: "register first" })
    };

    res.json({ success: true });
});

app.post("/add-student", async (req, res) => {
    const { username, name, email, phone, address } = req.body;

    const formattedName = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.json({
            success: false,
            message: "Invalid email format"
        });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.json({
            success: false,
            message: "Phone must be 10 digits"
        });
    }


    const user = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    if (user.rows.length === 0) {
        return res.json({ success: false, message: "User not registered" });
    }

    const result =user.rows[0]
if (result.role !== "student") {

  return res.json({ success: false, message: "he is not a student" });
}


    const check = await pool.query(
        "SELECT * FROM studentss WHERE username=$1",
        [username]
    );
    if (check.rows.length > 0) {
        return res.json({ success: false, message: "userr already added" })
    }


    await pool.query(
        "INSERT INTO studentss (username, name, email, phone, address) VALUES ($1,$2,$3,$4,$5)",
        [username, formattedName, email, phone, address]
    );

    res.json({ success: true, message: "Student added" });
});
// app.post("/view-student", async (req, res) => {

//     const { username } = req.body;
//     const result = await pool.query(
//         "SELECT * FROM studentss WHERE username=$1",
//         [username]
//     )
//     if (result.rows.length === 0) {
//         return res.json({ success: false, message: "no data found" })
//     }
//     res.json({
//         success: true,
//         student: result.rows[0]
//     })

// })
app.post("/add-teacher", async (req, res) => {
    const { username, name, email, phone, address } = req.body;

    const formattedName = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.json({
            success: false,
            message: "Invalid email format"
        });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.json({
            success: false,
            message: "Phone must be 10 digits"
        });
    }


    const user = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    if (user.rows.length === 0) {
        return res.json({ success: false, message: "User not registered" });
    }

    const result =user.rows[0]
if (result.role !== "teacher") {

  return res.json({ success: false, message: "he is not a teacher" });
}


    const check = await pool.query(
        "SELECT * FROM teachers WHERE username=$1",
        [username]
    );
    if (check.rows.length > 0) {
        return res.json({ success: false, message: "userr already added" })
    }


    await pool.query(
        "INSERT INTO teachers (username, name, email, phone, address) VALUES ($1,$2,$3,$4,$5)",
        [username, formattedName, email, phone, address]
    );

    res.json({ success: true, message: "Teacher added" });
});
app.post("/update-student", async (req, res) => {
    const { username, name, email, phone, address } = req.body;
    const formatteddName = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.json({
            success: false,
            message: "Invalid email format"
        });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.json({
            success: false,
            message: "Phone must be 10 digits"
        });
    }

    const result = await pool.query(
        "SELECT * FROM studentss WHERE username=$1",
        [username]
    )

    if (result.rows.length === 0) {
        return res.json({ success: false, message: "users not found" })
    }



    await pool.query(
        "UPDATE studentss SET name=$1, email=$2, phone=$3, address=$4 WHERE username=$5",
        [formatteddName, email, phone, address, username]
    );

   return res.json({ success: true, message:"Role updated"});
});

app.post("/update-teacher", async (req, res) => {
    const { username, name, email, phone, address } = req.body;
    const formatteddName = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.json({
            success: false,
            message: "Invalid email format"
        });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.json({
            success: false,
            message: "Phone must be 10 digits"
        });
    }

    const result = await pool.query(
        "SELECT * FROM teachers WHERE username=$1",
        [username]
    )

    if (result.rows.length === 0) {
        return res.json({ success: false, message: "users not found" })
    }



    await pool.query(
        "UPDATE teachers SET name=$1, email=$2, phone=$3, address=$4 WHERE username=$5",
        [formatteddName, email, phone, address, username]
    );

   return res.json({ success: true, message:"Role updated"});
});

app.get("/all-students", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM studentss"
  );

  res.json({
    success: true,
    students: result.rows
  });
});
app.get("/all-teachers", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM teachers"
  );

  res.json({
    success: true,
    teachers: result.rows
  });
});
app.post("/add-teacher",async(req,res)=>{
const {username,name,email,phone,address}=req.body;


const newName = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.json({
            success: false,
            message: "Invalid email format"
        });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.json({
            success: false,
            message: "Phone must be 10 digits"
        });
    }


const result= await pool.query(
    "SELECT * FROM users WHERE username =$1",
    [username]
)
if(result.rows.length===0){
    return res.json({success:false,message:"no user found"})
}

const user=result.rows[0]
if (user.role !== "teacher") {

  return res.json({ success: false, message: "he is not teacher" });
}

await pool.query(
     "INSERT INTO teachers (username, name, email, phone, address) VALUES ($1,$2,$3,$4,$5)",
        [username, newName, email, phone, address]
)

return res.json({success:true,message:"added teacher "})
})





console.log("Step 4: Before server start")

app.listen(PORT, () => {
    console.log("server is running")
});