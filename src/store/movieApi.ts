import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Movie, MoviesResponse } from "@/types/movie.ts";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    // Get all movies with search, sort, and pagination
    getMovies: builder.query<
      MoviesResponse,
      {
        q?: string;
        _sort?: string;
        _order?: "asc" | "desc";
        _page?: number;
        _limit?: number;
      }
    >({
      query: (params) => ({
        url: "/movies",
        params,
      }),
      transformResponse: (response: Movie[], meta) => ({
        data: response,
        totalCount: meta?.response?.headers.get("x-total-count")
          ? Number(meta.response.headers.get("x-total-count"))
          : response.length,
      }),
      providesTags: [{ type: "Movies" }],
    }),

    // Get a single movie by ID
    getMovie: builder.query<Movie, number>({
      query: (id) => `/movies/${id}`,
      providesTags: [{ type: "Movies" }],
    }),

    // Create a new movie
    createMovie: builder.mutation<Movie, Omit<Movie, "id">>({
      query: (movie) => ({
        url: "/movies",
        method: "POST",
        body: movie,
      }),
      invalidatesTags: [{ type: "Movies" }],
    }),

    // Update an existing movie
    updateMovie: builder.mutation<Movie, { id: number; movie: Partial<Movie> }>(
      {
        query: ({ id, movie }) => ({
          url: `/movies/${id}`,
          method: "PUT",
          body: movie,
        }),
        invalidatesTags: [{ type: "Movies" }],
      }
    ),

    // Delete a movie
    deleteMovie: builder.mutation<void, number>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Movies" }],
    }),

    // Search movies by any field
    searchMovies: builder.query<MoviesResponse, string>({
      query: (query) => ({
        url: "/movies",
        params: { q: query },
      }),
      transformResponse: (response: Movie[]) => ({
        data: response,
        totalCount: response.length,
      }),
      providesTags: [{ type: "Movies" }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useSearchMoviesQuery,
} = movieApi;
