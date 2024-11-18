import { Router } from 'express';
import cw from '../libraries/middlewares/controllerWrapper.middleware.js';
import departmentController from '../controllers/department.controller.js';

export const router = Router();

router.route('/')
  .get(
    cw(departmentController.index),
  );
