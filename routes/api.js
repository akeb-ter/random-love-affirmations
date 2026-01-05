import express from "express"
import affirmations from "../data/affirmations.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json(affirmations)
})

router.get("/random", (req, res) => {
  const { lang } = req.query

  let pool = affirmations

  if (lang) {
    pool = affirmations.filter(item => item.lang === lang)
    
    if (pool.length === 0) {
      return res.status(404).json({
        error: "No affirmations found for this language"
      })
    }
  }

  const randomIndex = Math.floor(Math.random() * pool.length)
  res.status(200).json(pool[randomIndex])
})

export default router
