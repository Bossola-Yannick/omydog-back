import jwt from 'jsonwebtoken';
import { UserDatamapper } from '../../datamappers/index.datamapper.js';
import CustomError from '../errors/custom.error.js';

export default {
  // Create access and refresh tokens
  async createTokens(data){
    try {
      const accessTokenExp = Math.round(Date.now() / 1000 + 2);
      const refreshTokenExp = Math.round(Date.now() / 1000 + 604800);

      const accessToken = jwt.sign(
        { exp: accessTokenExp, data },
        process.env.JWT_PRIVATE_KEY,
      );
      const refreshToken = jwt.sign(
        { exp: refreshTokenExp, data },
        process.env.JWT_PRIVATE_KEY,
      );
      // Add refresh token in database
      await UserDatamapper.update(data.id, { refresh_token: refreshToken });
      // Return tokens
      return { accessToken, refreshToken };
    } catch(err) {
      throw err;
    }
  },

  async refreshTokens(refreshToken, data){
    try {
      // Check if refresh token porvided is the same that refresh token stored in database
      const user = await UserDatamapper.findByPk(data.id);
      if(!user){
        throw new CustomError('Ressource not found', { status: 404 });
      }
      
      if(user.refresh_token !== refreshToken){
        console.log("jwt.services", user.refresh_token, refreshToken);
        // If refresh tokens don't match, remove it from database to prevent unauthorized user to use it
        await UserDatamapper.update(data.id, { refresh_token: null });
        throw new CustomError('Invalid token', { status: 401 });
      }

      const tokens = await this.createTokens(data);
      // Return new tokens
      return tokens;
    } catch(err) {

      throw err;
    }
  },
};
