// Import the environmental variables from the configuration file
import app from "./App";

const port: number = 80;
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log('Listening at localhost:' + port + "/");
});