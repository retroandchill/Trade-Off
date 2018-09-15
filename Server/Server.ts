// Import the environmental variables from the configuration file
require ('dotenv').config();
import app from './models/App';

const port: number = Number(process.env.PORT) || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log('Listening at localhost:' + port + "/");
});