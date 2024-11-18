import { Router } from 'express';
import cw from '../libraries/middlewares/controllerWrapper.middleware.js';
import animalController from '../controllers/animal.controller.js';

export const router = Router();

router.route('/')
  /**
   * GET /api/animals/
   * @summary Get all animals
   * @tags animals
   * @return {AnimalTypesResponse[]} 200 - animals found
   * @example response - 200 - example success
   * [
   *    {
   *      "id": 1,
   *      "label": "Chien",
   *      "created_at": "2024-07-10T07:31:28.015Z",
   *      "updated_at": null
   *    },
   *    {
   *      "id": 2,
   *      "label": "Chat",
   *      "created_at": "2024-07-10T07:31:36.750Z",
   *      "updated_at": null
   *    }
   * ]
   */
  .get(
    cw(animalController.index),
  );
