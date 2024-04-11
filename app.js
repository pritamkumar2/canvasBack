import express from "express";
import cors from "cors";
import connectDb from "./utils/Db.js";
const app = express();
import router from "./router/auth-router.js";
const port = 3000;
app.use(express.json());
app.use("/api/", router);
app.use(cors());

connectDb().then(() => {
  app.listen(port, () => {
    console.log("running on port " + port);
  });
});
