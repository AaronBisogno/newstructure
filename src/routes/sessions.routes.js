import express from 'express';
import { SessionsController } from '../controller/sessions.controller.js';

export const sessionRouter = express.Router();
const sessionController = new SessionsController()

sessionRouter.get('/current', sessionController.showSession)
