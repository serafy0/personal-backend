import express, { Express, Request, Response } from "express"
import helmet from "helmet"
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit"
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const port = process.env.PORT

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(helmet())
app.use(limiter)

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" })
})

app.listen(port, () => {
    console.log(`💻 Server is running at localhost:${port}`)
})
