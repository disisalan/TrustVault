var express=require("express")
const cors = require('cors');
const {sequelize,connectDB} = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const userRoutes=require("./Routes/userRoutes")
const issuerRoutes=require("./Routes/issuerRoutes")


var app= express()
app.use(express.json());  // ✅ Add this to enable JSON parsing
app.use(cors());

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api',userRoutes);
app.use('/api',issuerRoutes);

app.listen(5050,()=>{
    console.log("Server running at 5050 port")
})
