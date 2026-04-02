import express from "express";

const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    const stressData = req.body;

    // Call the Flask Microservice
    const flaskResponse = await fetch("http://127.0.0.1:5000/predict", {
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
    return res.status(500).json({ error: "Failed to connect to ML service. Ensure the Flask server is running." });
  }
});

export default router;
