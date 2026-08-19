/**
 * @file tokens.d.ts — Declarações TypeScript para Design Tokens Brasil Sustenta
 */

export interface TokenItem {
  name?: string;
  var: string;
  hex?: string;
  value?: string;
  label?: string;
  use?: string;
  persona?: string;
}

export interface TypographyFamily {
  var: string;
  stack: string;
  role: string;
}

export interface TypographyScaleItem {
  level: string;
  family: string;
  weight: string;
  size: string;
  tracking: string;
  transform: string;
}

export interface ODSItem {
  n: number;
  var: string;
  hex: string;
  label: string;
  shortLabel?: string;
}

export interface TokensMetadata {
  name: string;
  version: string;
  direction: string;
  source: string;
  snapshot: string;
  note: string;
}

export interface TokensSchema {
  _meta: TokensMetadata;
  color: {
    base: TokenItem[];
    persona: TokenItem[];
    status: TokenItem[];
    border: TokenItem[];
  };
  typography: {
    families: Record<string, TypographyFamily>;
    scale: TypographyScaleItem[];
  };
  radius: TokenItem[];
  motion: {
    ease: string;
    duration: string;
    properties: string;
    tokens?: TokenItem[];
  };
  glass?: TokenItem[];
  gradient?: TokenItem[];
  cta?: TokenItem[];
  ods: ODSItem[];
}

export declare const tokens: TokensSchema;
export declare const flatTokens: Record<string, string>;
export declare const colors: {
  base: TokenItem[];
  persona: TokenItem[];
  status: TokenItem[];
  border: TokenItem[];
  ods: ODSItem[];
};
export declare const typography: TokensSchema["typography"];
export declare const radius: TokenItem[];
export declare const motion: TokensSchema["motion"];
export declare const glass: TokenItem[];
export declare const gradient: TokenItem[];
export declare const cta: TokenItem[];
export declare const ods: ODSItem[];

export default tokens;
