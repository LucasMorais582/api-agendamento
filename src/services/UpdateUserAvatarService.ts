import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/Users';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) throw Error('Only authenticated users can change avatar.');

    // Caso o usuário já tenha avatar, deletar o anterior antes de salvar o novo
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;
    userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
