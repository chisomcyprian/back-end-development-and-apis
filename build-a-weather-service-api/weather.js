import express from 'express';
const router = express.Router()

const SUPPORTED_CITIES = ["London", "Tokyo", "Lagos", "Paris"];

router.get("/", (req,res) => {
    res.json(SUPPORTED_CITIES);
});
router.get('/:city', async (req,res) => {
    const {city} = req.params;
    try {
      const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
      const data = await response.json();
            
      res.json({
        city, 
        temperature:data.main.temp, 
        description:"data.weather[0].description"});
      
    } catch (error) {
        res.status(404).json({error: `Could not fetch weather for ${city}`});
    }

});

export default router;