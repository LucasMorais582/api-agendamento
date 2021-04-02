import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateProviderDTO from '../dtos/IParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IMailTemplateProviderDTO): Promise<string> {
    return template;
  }
}
