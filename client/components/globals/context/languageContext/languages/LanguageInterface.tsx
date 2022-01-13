import SEjson from "./SE.json";
import ENjson from "./EN.json";

export interface ILanguageVariables {
  SiteTitle: string;
}

export const SE: ILanguageVariables = SEjson;
export const EN: ILanguageVariables = ENjson;
