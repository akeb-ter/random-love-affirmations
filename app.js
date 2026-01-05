import express from "express"
import path from "path"
import apiRoutes from "./routes/api.js"

const app = express()
const port = 3000

// Serve static files
app.use(express.static("public"))

// API routes
app.use("/api", apiRoutes)

// Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"))
})

app.get("/generator", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "generator.html"))
})

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(process.cwd(), "public", "404.html"))
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
