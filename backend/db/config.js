const mongoose = require("mongoose");
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e);
  });
