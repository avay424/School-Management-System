📘 Full Stack Authentication App Documentation
🧠 PROJECT OVERVIEW
I built a system where:

User can Register

User can Login

Based on role → redirect to:

Student Page
Teacher Page
Admin Page
Admin can change roles

Protected routes using JWT Authentication

⚙️ BACKEND SETUP (Node.js + Express + PostgreSQL)
Step 1: Install dependencies
npm init -y
npm install express cors bcrypt jsonwebtoken dotenv pg
Step 2: Create .env
PORT=5000
JWT_SECRET=your_secret_key
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_NAME=yourdbname
DB_PORT=5432
Step 3: Database Connection (db.js)
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
👉 Explanation:

Pool = connection with PostgreSQL
process.env = reading data from .env
Step 4: Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(20)
);
Step 5: Server Setup
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
👉 Explanation:

express() → server
cors() → allow frontend
express.json() → read JSON
🔐 REGISTER API
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (user.rows.length > 0) {
    return res.json({ success: false, message: "user exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username,password,role) VALUES($1,$2,$3)",
    [username, hashed, "student"]
  );

  res.json({ success: true });
});
👉 Key Points:

Check if user exists
Hash password using bcrypt
Insert that username and pass into db
Default role = student
🔑 LOGIN API
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
    return res.json({ success: false, message: "wrong password" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET
  );

  res.json({ success: true, token });
});
👉 Important:

bcrypt.compare() → check password
jwt.sign() → create token
{ id: user.id, role: user.role }
👉 This means:

id = user id from DB
role = student / teacher / admin
*IMPORTANT THING TO UNDERSTAND 1.First we have to take data from body 2.Check it in db if username exists or not 3.If username not exists then error and if exists then next step 4.Then we create a const and in that we check all rows 0f that username 5.Then we compare the password from body using bcrypt 6.If password not match then return some json 7.If password also exists then create a const token and in that store users id and role and secret that we store in dotenv

👑 ADMIN ROLE CHANGE API
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
    return res.json({ success: false, message: "register first" });
  }

  res.json({ success: true });
});
👉 Flow:

Get token
Decode token
Check if admin
Update role
*IMPORTANT THINGS TO UNDERSTAND 1.First we are making a const token and in that we r requesting for headers.authorization and we r splitting that beacuse somwhere in my frontend we r using bearer beacuse it tell server i am sending a token to prove my identity and its a standard format used in jwt.so my backened will receive something like bearer "hsjsbdjddndndn" string and that string contains payload.headers.signature and here if authorization is success means if we got token from local storage spilit it. 2.Then we use a if statement to check if token is not found from local storage return response no token 3.If token is found then we use a const and decode it using bcrypt 4.Then we use a if statement to check if my decoded role is admin then only we can change otherwise we cant change it 5.Then we take username and role from body 6.Then we take a const and in it we check db and updates user 7.Then at last we use a if statemnet that if that user is in our databases or not if yes then upadte otherwise not

🎨 FRONTEND (React)
Step 1: Install
npm init -y
npm install react react-dom react-router-dom
npm install --save-dev parcel
npm install --save-dev tailwindcss postcss autoprefixer
npm install @tailwindcss/postcss
npm start

# i used tailwind setup from tailwind website
🔐 LOGIN COMPONENT
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

const handleLogin = async () => {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("token", data.token);
    alert("login success")
  }

  const payload = JSON.parse(atob(data.token.split(".")[1]));

  if (payload.role === "student") navigate("/student");
  if (payload.role === "teacher") navigate("/teacher");
  if (payload.role === "admin") navigate("/admin");
};
}
👉 Explanation:

localStorage → store token
atob() → decode JWT
*IMPORTANT THINGS TO UNDERSTAND 1.Here when we click login button the component handlelogin gets called and code under that goes to backened 2.Then backened does its work and after that we create a const data in which we store res from backend 3.Then we make a if statement that if my data is success i will alert this else alert this and with in it i am storing that token in my local storage 4.Then we are spillitng that token using split and taking [1] 5.Then as we save our user id and role in token prevoiusly and we now stores in data so we are using json.parse to convert it in json format and then we can see after encoding the role 6.Then after that we make a condition that if my payload.role is that i goes to that page 7.UseNaigate is used to do that and we store it in navigate variable so here we use naviagte
🛡️ PROTECTED ROUTE
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (role && payload.role !== role) {
    alert("Sorry please login")
    return <Navigate to="/" />;
  }

  return children;
};
👉 Explanation:

If no token → redirect
If role mismatch → block access
children = component inside ProtectedRoute
Example:

<ProtectedRoute role="admin">
  <Admin />
</ProtectedRoute>
🧭 ROUTING
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: "/register", element: <Register /> }
    ]
  },
  {
    path: "/student",
    element: <ProtectedRoute role="student"><Student /></ProtectedRoute>
  },
  {
    path: "/teacher",
    element: <ProtectedRoute role="teacher"><Teacher /></ProtectedRoute>
  },
  {
    path: "/admin",
    element: <ProtectedRoute role="admin"><Admin /></ProtectedRoute>
  }
]);
*Here we used index true means in home route we will always see login page

*Here its a simple thing if data is success just alrt regsiterd

🧾 NAVBAR
<Link to="/student">Student</Link>
<Link to="/teacher">Teacher</Link>
<Link to="/admin">Admin</Link>
👉 Used for navigation

