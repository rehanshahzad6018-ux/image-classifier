import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  res.json({ message: '✓ Backend API is running' })
})

app.post('/api/classify', async (req, res) => {
  try {
    const { base64, mimeType } = req.body

    if (!base64 || !mimeType) {
      return res.status(400).json({ error: 'Missing base64 or mimeType' })
    }

    // Mock response for testing (no API call needed)
    const mockResult = {
      "primaryObject": "Hands framing sunset",
      "category": "Nature",
      "confidence": 92,
      "description": "Two hands forming a heart shape silhouetted against a vibrant golden sunset over the ocean. The composition captures a romantic moment with warm colors reflected on the water.",
      "tags": ["sunset", "hands", "heart", "love", "ocean"],
      "color": "Golden orange, warm pink, deep purple, ocean blue",
      "mood": "Romantic, peaceful, serene, intimate",
      "setting": "Beach or coastal area during sunset, outdoor, natural lighting",
      "details": [
        { "key": "Lighting", "value": "Golden hour sunset lighting with strong backlighting creating silhouettes" },
        { "key": "Composition", "value": "Centered symmetrical composition with hands in foreground, sunset in middle ground, ocean in background" },
        { "key": "Notable Detail", "value": "The heart shape formed by the hands frames the sun perfectly, creating a romantic focal point" }
      ]
    }

    res.json(mockResult)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: error.message || 'Failed to classify image' })
  }
})

const HOST = '127.0.0.1'

app.listen(PORT, HOST, () => {
  console.log(`✓ Backend server running on http://localhost:${PORT}`)
})
