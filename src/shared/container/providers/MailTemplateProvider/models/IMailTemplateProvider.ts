import IParseMailProviderDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailProvider {
  parse(data: IParseMailProviderDTO): Promise<string>;
}
