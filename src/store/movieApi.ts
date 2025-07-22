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
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    // Get all movies with pagination
    getMovies: builder.query<
      MoviesResponse,
      {
        _page?: number;
        _limit?: number;
        q?: string;
        _sort?: string;
        _order?: "asc" | "desc";
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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Movie" as const, id })),
              { type: "Movie", id: "LIST" },
            ]
          : [{ type: "Movie", id: "LIST" }],
    }),

    // Get a single movie by ID
    getMovie: builder.query<Movie, number>({
      query: (id) => `/movies/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Movie", id }],
    }),

    // Create a new movie
    createMovie: builder.mutation<Movie, Omit<Movie, "id">>({
      query: (movie) => ({
        url: "/movies",
        method: "POST",
        body: movie,
      }),
      invalidatesTags: [{ type: "Movie", id: "LIST" }],
    }),

    // Update an existing movie
    updateMovie: builder.mutation<Movie, { id: number; movie: Partial<Movie> }>(
      {
        query: ({ id, movie }) => ({
          url: `/movies/${id}`,
          method: "PUT",
          body: movie,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          { type: "Movie", id },
          { type: "Movie", id: "LIST" },
        ],
      }
    ),

    // Delete a movie
    deleteMovie: builder.mutation<void, number>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Movie", id },
        { type: "Movie", id: "LIST" },
      ],
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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Movie" as const, id })),
              { type: "Movie", id: "SEARCH" },
            ]
          : [{ type: "Movie", id: "SEARCH" }],
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
