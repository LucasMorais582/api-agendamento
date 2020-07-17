import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user)
      throw new AppError('Only authenticated users can change avatar.', 401);

    // Caso o usuário já tenha avatar, deletar o anterior antes de salvar o novo
    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
