// Compare city & department data coming from the front-end with the data from the API
// Then stock them with same writing format in the database

import ApiError from '../errors/api.error.js';

export default () => async (req, res, next) => {

  if (req.body.city) {
    const cityReq = req.body.city.split(' ')[0];
    const departmentReq = req.body.department_label;
    try {
      const cityResult = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityReq}&fields=nom,departement&boost=population&limit=5`);
      const dataCity = await cityResult.json();
      const departmentFound = dataCity.find((city) => city.departement.nom === departmentReq);
      const departmentSelected = departmentFound.departement.nom;

      if(!dataCity.length || !departmentFound) {
        throw new ApiError('Invalid city name or no exact match found.', { status: 400 });
      }
      const cityFound = dataCity.find((city) => city.nom === cityReq);
      const citySelected = cityFound.nom;

      // Compare city with same writing format
      function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }

      // if city selected is the right one, write it the same way in params
      if (normalizeString(citySelected) === normalizeString(cityReq) && normalizeString(departmentSelected) === normalizeString(departmentReq)) {
        req.body.city = citySelected;
        req.body.department_label = departmentSelected;
        return next();
      }

      else {
        throw new ApiError('Invalid city name or no exact match found.', { status: 400 });
      }
    } catch(err) {
      
      next(err);
    }
  }

  next();
};
