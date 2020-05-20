import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // Apagando senha para exibição do response
    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(409).json({ error: error.message });
  }
});
export default sessionsRouter;
