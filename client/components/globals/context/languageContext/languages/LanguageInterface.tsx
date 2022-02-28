import SEjson from "./SE.json";
import ENjson from "./EN.json";

export interface ILanguageVariables {
  SiteTitle: string;
  YourDogs: string;
  AddDog: string;
  AddDate: string;
  name: string;
  breed: string;
  weight: string;
  change: string;
  save: string;
  date: string;
  delete_dog: string;
  hide: string;

  /* Login */
  login_password: string;
  login_login: string;
  login_reg: string;
  login_logout: string;

  /* Calculator */
  calc_heading: string;
  calc_calc: string;
  calc_amount_day: string;
  calc_amount_meal: string;
  calc_tot: string;
  calc_musclemeat: string;
  calc_bone: string;
  calc_liver: string;
  calc_organmeat: string;
}

export const SE: ILanguageVariables = SEjson;
export const EN: ILanguageVariables = ENjson;
