// formato de la respuesta de la peticion
export interface BookReponse {
  count: number;
  next: string;
  previous: null | string;
  results: Book[];
}

// Informacion individual de los libros
export interface Book {
  id: number;
  title: string;
  authors: authors[];
  subjects: string[];
  languages: string[];
  copyright: boolean;
  download_count: number;
  formats: formats;
}

// autores del libro
interface authors {
  name: string;
  birth_year: number;
  death_year: number;
}

// formatos de descarga / multimedia relacionada al libro
interface formats {
  'application/octet-stream': string;
  'image/jpeg': string;
}
