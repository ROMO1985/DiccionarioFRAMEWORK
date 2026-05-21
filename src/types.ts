export enum TermCategory {
  DEFINITIONS = "Definiciones Básicas (Sec. 2.1)",
  SUPPLEMENTARY = "Definiciones Suplementarias (Sec. 2.2)",
  ABBREVIATIONS = "Abreviaturas (Sec. 2.3)",
  EXTENDED = "Glosario Extendido (Apéndice A)"
}

export interface TOGAFTerm {
  id: string;
  english: string;
  spanish: string;
  englishDefinition: string;
  spanishDefinition: string;
  reference: string;
  category: TermCategory;
  domain?: "Business" | "Data" | "Application" | "Technology" | "Governance" | "General";
  admPhase?: string;
  source?: "TOGAF" | "ISO 9000" | "Ambas";
  togafEnglishDefinition?: string;
  togafSpanishDefinition?: string;
  isoEnglishDefinition?: string;
  isoSpanishDefinition?: string;
}
