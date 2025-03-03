require('dotenv').config();
const express=require('express');
const app=express();
const gadgetRouter=require('./routes/gadgetRoutes')
const authRoutes=require('./routes/authRoutes')


app.use(express.json());

const PORT=process.env.PORT

app.use('/gadgets',gadgetRouter)
app.use('/user',authRoutes)



app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})