import fs from 'fs';

export default (schema, reqProperty) => async (req, res, next) => {
  const userInput = req[reqProperty];

  try {
    await schema.validateAsync(userInput);
  }catch(err){
    //Si jamais il y a une erreur lors de la validation du schéma sur une route qui a sauvegardé une image dans le back => on la supprime
    if (req.file) {
      fs.unlink(req.file.path, (error) => {
        if (error) {
          console.error('Error deleting file in validation.middleware:', error);
        }
      });
    }

    next(err);
  }

  next();
};
