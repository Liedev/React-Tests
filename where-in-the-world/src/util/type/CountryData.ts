import { CurrencyData } from "./CurrencyData";
import { FlagData } from "./FlagData";
import { LanguagesData } from "./LanguagesData";
import { regionalBlocsData } from "./RegionalBlocsData";
import { TranslationsData } from "./TranslationsData";

export interface CountryData {
    alpha2Code: string;
    alpha3Code: string;
    altSpellings: string[];
    area: number;
    borders: string[];
    callingCodes: string[];
    capital: string;
    cioc: string;
    currencies: CurrencyData[]
    demonym: string
    flag: string;
    flags: FlagData;
    independent: boolean;
    languages: LanguagesData[];
    latlng: number[];
    name: string;
    nativeName: string;
    numericCode: string;
    population: number;
    region: string;
    regionalBlocs: regionalBlocsData;
    subregion: string;
    timezones: string;
    topLevelDomain: string[];
    translations: TranslationsData
}