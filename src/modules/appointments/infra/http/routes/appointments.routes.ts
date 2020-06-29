import { Router } from 'express';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentController = new AppointmentsController();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();

  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
appointmentsRouter.post('/', appointmentController.create);
export default appointmentsRouter;
