import SEjson from "./SE.json";
import ENjson from "./EN.json";

export interface ILanguageVariables {
  SiteTitle: string;
  YourDogs: string;
  AddDog: string;
  AddDate: string;
}

export const SE: ILanguageVariables = SEjson;
export const EN: ILanguageVariables = ENjson;
