export enum BrandTheme {
  CLINICAL = 'CLINICAL',
  LUXURY = 'LUXURY',
  HYPE = 'HYPE'
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface GeneratedCopy {
  headline: string;
  body: string;
}
