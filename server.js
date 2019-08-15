import express from 'express'
import * as CONFIG from './config/config'
import bodyParser from 'body-parser'


const app = express();
import router from './routes/api'

/*
app.use('/', function(req, res){
	res.statusCode = 200;//send the appropriate status code
	res.json({status:"success", message:"Week By Week API", data:{}})
});
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api', router)

app.listen(CONFIG.port, () => {
    console.log("running on" + CONFIG.port)
} )

export default app