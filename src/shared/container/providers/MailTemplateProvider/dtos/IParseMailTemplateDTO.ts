interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailtemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
