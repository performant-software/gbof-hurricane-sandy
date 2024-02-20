export interface Field {
  value: string;
  displayLabel: string;
  show: boolean;
  uuid?: string;
  isUserDefined: boolean;
}

export interface HitField {
  showCaption?: boolean;
  displayLabel?: string;
  isUserDefined?: boolean;
  show?: boolean;
  snippet?: number;
  render?: (hit: any) => string;
  type?: "identifier" | "showcase";
  uuid?: string;
  value?: string;
}

export type Locale = 'en' | 'fr'
