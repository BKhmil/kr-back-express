import express, { Request, Response } from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {res.json({message: "meow"})});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000")
});