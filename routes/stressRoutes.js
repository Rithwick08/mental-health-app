import express from "express";

const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    const stressData = req.body;

    // ✅ FIXED: Use deployed ML service
    const flaskResponse = await fetch(`${process.env.FLASK_API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stressData)
    });

    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      return res.status(flaskResponse.status).json(errorData);
    }

    const data = await flaskResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error communicating with Flask ML service:", error.message);
    return res.status(500).json({ error: "Failed to connect to ML service." });
  }
});

export default router;
