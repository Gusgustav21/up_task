import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dns from "node:dns"
import { connectDB } from "./config/db"
import projectRoutes from "./routes/projectRoutes"
import { corsConfig } from "./config/cors"

dotenv.config()

const dnsServers = process.env.DNS_SERVERS?.split(",").map(s => s.trim()).filter(Boolean)
if (dnsServers?.length) {
    dns.setServers(dnsServers)
}

connectDB()

const app = express()

app.use(cors(corsConfig))

app.use(express.json())

// Routes
app.use("/api/projects", projectRoutes)

export default app