require('dotenv').config();

const express = require("express");
const connectDB = require('./Controllers/database.Controller');
const morgan = require("morgan");                   // the logger


const userRoute = require("./Routes/user.Route")
const authRoute = require("./Routes/auth.Route")
const categoryRouter = require("./Routes/category.router");
const brandRouter = require("./Routes/brand.router");
const storeRouter = require("./Routes/store.router");
const stockRouter = require("./Routes/stock.router");
const SupplierRouter = require("./Routes/supplier.router");
const ProductRouter = require("./Routes/product.router");

// create express app
const app = express()

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`)
}


app.use("/test", (req, res) => {
  console.log("hey in url test ");
})



app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/category', categoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/store', storeRouter);
app.use('/api/stock', stockRouter);
app.use('/api/Supplier', SupplierRouter);
app.use('/api/Product', ProductRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});

