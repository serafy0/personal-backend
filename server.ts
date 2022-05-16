import express, { Express, Request, Response } from "express"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(helmet())

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" })
})

app.listen(port, () => {
    console.log(`💻 Server is running at localhost:${port}`)
})
