export type LanguagesProvider<Languages extends string> = {
  names: {
    [K in Languages]: string;
  };
  languages: {
    key: Languages;
    name: string;
  }[];
};

export function initLanguages<Langs extends string>(languages: {
  [K in Langs]: string;
}): LanguagesProvider<Langs> {
  return {
    languages: Object.entries<string>(languages).map(([key, name]) => ({
      key: key as Langs,
      name: name as string,
    })),
    names: languages,
  };
}
