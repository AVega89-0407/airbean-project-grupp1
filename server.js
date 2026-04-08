// Importerar Express, routes och miljövariabler
import express from 'express'
import apiRoutes from './routes/api.js';
import "dotenv/config";

const app = express();
app.use(express.json());
// Kopplar alla API-routes under /api
app.use("/api", apiRoutes);


app.get('/', (req,res) => {
    res.json({ message: 'Welcome to Airbean!'});
});

// Startar servern på angiven port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API:et lyssnar på http://localhost:${PORT}`);
    
});