interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailtemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
