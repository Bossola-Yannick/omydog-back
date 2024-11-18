import logger from '../helpers/logger.services.js';

export default  (err, req, res, next) => {
  logger.error(err);
  if(err.name === 'ValidationError'){
    err.status = 400;
    err.message = `Bad request / ${err.details.map((detail) => detail.message)}`;
  }

  if(!err.status){
    err.status = 500;
  }

  if(err.status === 500){
    err.message = 'Internal server error';
  }

  return res.status(err.status).json({ error: err.message });
};
