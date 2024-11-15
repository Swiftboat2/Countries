import cors from 'cors'
import Api from './Api.js'
import express from 'express'
import { PORT } from './config.js'

const app = express()

app.use(cors(
    {
    origin: 'http://localhost:5173',
    }
));

app.get('/getCountries', (req, res) => {
    Api.getAllCountries()
    .then(response => {
      res.status(200).send(response);
     })
     .catch(error => {
       res.status(500).send(error);
  });
  });

  app.get('/getCountryInfo/:countryCode', (req, res) => {
    const { countryCode } = req.params; 
    console.log("Received countryCode:", countryCode);
    Api.getCountryInfo(countryCode)
    .then(response => {
      res.status(200).send(response);
     })
     .catch(error => {
       res.status(500).send(error);
  });
  });

  app.get('/getCountryFlag', (req, res) => {
    Api.getCountryFlag()
    .then(response => {
      res.status(200).send(response);
     })
     .catch(error => {
       res.status(500).send(error);
  });
  });

  app.get('/getCountryPopulation', (req, res) => {
    Api.getCountryPopulation()
    .then(response => {
      res.status(200).send(response);
     })
     .catch(error => {
       res.status(500).send(error);
  });
  });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });