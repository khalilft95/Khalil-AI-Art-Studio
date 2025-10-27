export enum ArtStyle {
  SCRIBBLE = "Scribble Art",
  VECTOR = "Vector Art",
  POP = "Pop Art",
  DRAWING = "Drawing Art",
  VECTOR_V1 = "Vector Art V1",
  VECTOR_V2 = "Vector Art V2",
  VECTOR_V3 = "Vector Art V3",
  VECTOR_V4 = "Vector Art V4",
  VECTOR_V5 = "Vector Art V5",
  VECTOR_V6 = "Vector Art V6",
  WPOP = "Wpop",
  LOW_POLY_VECTOR = "Low-poly vector",
}

export interface ArtStyleOption {
  id: ArtStyle;
  name: string;
  thumbnail: string;
}