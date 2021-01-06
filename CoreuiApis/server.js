'use strict';

require('dotenv').config();
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
require('./app/db');

const PORT = process.env.NODE_PORT || 3000;
const IP = config.get('IP');
const app = express();
const swaggerJsonDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const Options = {  
  swaggerDefinition: {
    info: {
      "version" : '1.0.0',
      "swagger": "2.0.0",
      "title": "Autism APIs",
      "description": "Autism APIs description",
      "contact": {
        "name": "Impute Dev",
      },
    },
    securityDefinitions: {
      "token": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
      }
    },
  },
  apis: ['./app/routes/*.js']
};
const specs =  swaggerJsonDoc(Options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middleware/passport')(passport)
require('./app/routes')(app)

const onServerStart = () => {
  const ENVIROINMENT = process.env.NODE_ENV || 'development';
  const message = `Server Listening On Port ${PORT}, ENVIROINMENT=${ENVIROINMENT}`;
  // eslint-disable-next-line no-console
  console.log(message);
};

app.listen(PORT, IP, onServerStart);
