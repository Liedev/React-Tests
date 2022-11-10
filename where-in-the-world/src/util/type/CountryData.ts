export interface CountryData {
    alpha2Code: string;
    alpha3Code: string;
    altSpellings: string[];
    area: number;
    borders: string[];
    callingCodes: string[];
    capital: string;
    cioc: string;
    //TODO: check if i need this, if so put in different file
    currencies: { code: string; name: string; symbol: string; }[]
    demonym: string
    flag: string;
    flags: { svg: string, png: string };
    independent: boolean;
    //TODO: check if i need this, if so put in different file
    languages: { iso639_1: string; iso639_2: string; name: string; nativeName: string };
    latlng: number[];
    name: string;
    nativeName: string;
    numericCode: string;
    population: number;
    region: string;
    //TODO: check if i need this, if so put in different file
    regionalBlocs: { acronym: string; name: string };
    subregion: string;
    timezones: string;
    topLevelDomain: string[];
    //TODO: check if i need this, if so put in different file
    translations: {
        br: string;
        de: string;
        es: string;
        fa: string;
        fr: string;
        hr: string;
        hu: string;
        it: string;
        ja: string;
        nl: string;
        pt: string;
    }
}