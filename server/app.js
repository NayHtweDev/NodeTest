var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require("morgan")
const app = express();
const port = 3000;


app.use(morgan("combined"));


// enable CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) 

// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/uploads',express.static('uploads'));

app.get('/', (req, res) => {
    const output = { value:  'hello world!' }
    res.send(output)
})


const adminRoutes = require('./routes/admin');
app.use(adminRoutes);

const parentRoutes = require('./routes/parent');
app.use(parentRoutes);

const productRoutes = require('./routes/product');
app.use(productRoutes);

//configure the server port
app.listen(port, () => {
    console.log('Server runs on port 3000')
})