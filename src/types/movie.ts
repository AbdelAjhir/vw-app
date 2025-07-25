export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieFormData {
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: string;
  popularity: string;
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface MoviesResponse {
  data: Movie[];
  totalCount?: number;
}
