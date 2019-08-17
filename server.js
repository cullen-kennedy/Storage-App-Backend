import express from 'express'
import * as CONFIG from './config/config'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/api'

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api', router)

app.listen(CONFIG.port, () => {
    console.log("running on" + CONFIG.port)
} )

export default app