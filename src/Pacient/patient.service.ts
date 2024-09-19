const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('patient.routes');

const app = express();



app.use(bodyParser.json());

app.use('/patients', patientRoutes);

app.listen(port, () => {
    console.log(`Server is running`);
});