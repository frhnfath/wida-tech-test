const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3001;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Sample route
// app.get('/api', (req, res) => {
//     res.send('Hello from the backend!');
// });
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
