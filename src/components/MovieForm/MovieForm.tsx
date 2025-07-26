import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Movie, MovieFormData } from "@/types/movie";

interface MovieFormProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  movie?: Partial<Movie>;
  onSubmit: (_movie: Omit<Movie, "id">) => void;
  isLoading?: boolean;
}

const MovieForm = ({
  open,
  onOpenChange,
  movie,
  onSubmit,
  isLoading,
}: MovieFormProps) => {
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    original_title: "",
    overview: "",
    release_date: "",
    vote_average: "",
    popularity: "",
    original_language: "",
    adult: false,
    video: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when movie changes
  useEffect(() => {
    setFormData({
      title: movie?.title || "",
      original_title: movie?.original_title || "",
      overview: movie?.overview || "",
      release_date: movie?.release_date || "",
      vote_average: movie?.vote_average?.toFixed(1) || "",
      popularity: movie?.popularity?.toFixed(0) || "",
      original_language: movie?.original_language || "",
      adult: movie?.adult || false,
      video: movie?.video || false,
    });
    setErrors({});
  }, [movie]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.overview.trim()) {
      newErrors.overview = "Overview is required";
    }

    if (!formData.release_date) {
      newErrors.release_date = "Release date is required";
    }

    if (
      !formData.vote_average ||
      parseFloat(formData.vote_average) < 0 ||
      parseFloat(formData.vote_average) > 10
    ) {
      newErrors.vote_average = "Rating must be between 0 and 10";
    }

    if (!formData.popularity || parseFloat(formData.popularity) < 0) {
      newErrors.popularity = "Popularity must be a positive number";
    } else if (parseFloat(formData.popularity) > 1000) {
      newErrors.popularity = "Popularity must be less than 1000";
    }

    if (!formData.original_language.trim()) {
      newErrors.original_language = "Language is required";
    } else if (formData.original_language.length !== 2) {
      newErrors.original_language =
        "Language must be 2 characters (e.g., en, es, fr)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      title: formData.title,
      original_title: formData.original_title,
      overview: formData.overview,
      release_date: formData.release_date,
      vote_average:
        parseFloat(parseFloat(formData.vote_average).toFixed(1)) || 0,
      popularity: parseFloat(parseFloat(formData.popularity).toFixed(2)) || 0,
      original_language: formData.original_language,
      adult: formData.adult,
      video: formData.video,
      backdrop_path: movie?.backdrop_path || "",
      poster_path: movie?.poster_path || "",
      genre_ids: movie?.genre_ids || [],
      vote_count: movie?.vote_count || 0,
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{movie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
          <DialogDescription>
            {movie
              ? "Update the movie information below."
              : "Fill in the details to add a new movie to the database."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="movie-title"
              >
                Title
              </label>
              <Input
                aria-describedby={errors.title ? "title-error" : undefined}
                id="movie-title"
                placeholder="Movie title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors.title && (
                <p
                  aria-live="polite"
                  className="mt-1 text-sm text-red-500"
                  id="title-error"
                >
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="movie-original-title"
              >
                Original Title
              </label>
              <Input
                id="movie-original-title"
                placeholder="Original title"
                value={formData.original_title}
                onChange={(e) =>
                  setFormData({ ...formData, original_title: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium"
              htmlFor="movie-overview"
            >
              Overview
            </label>
            <textarea
              aria-describedby={errors.overview ? "overview-error" : undefined}
              className="h-24 w-full resize-none rounded-md border border-gray-300 p-3"
              id="movie-overview"
              placeholder="Movie overview"
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
            />
            {errors.overview && (
              <p
                aria-live="polite"
                className="mt-1 text-sm text-red-500"
                id="overview-error"
              >
                {errors.overview}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="movie-release-date"
              >
                Release Date
              </label>
              <Input
                aria-describedby={
                  errors.release_date ? "release-date-error" : undefined
                }
                id="movie-release-date"
                type="date"
                value={formData.release_date}
                onChange={(e) =>
                  setFormData({ ...formData, release_date: e.target.value })
                }
              />
              {errors.release_date && (
                <p
                  aria-live="polite"
                  className="mt-1 text-sm text-red-500"
                  id="release-date-error"
                >
                  {errors.release_date}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="movie-rating"
              >
                Rating
              </label>
              <Input
                aria-describedby={
                  errors.vote_average ? "rating-error" : undefined
                }
                id="movie-rating"
                placeholder="0.0"
                step="0.1"
                type="number"
                value={formData.vote_average}
                onChange={(e) =>
                  setFormData({ ...formData, vote_average: e.target.value })
                }
              />
              {errors.vote_average && (
                <p
                  aria-live="polite"
                  className="mt-1 text-sm text-red-500"
                  id="rating-error"
                >
                  {errors.vote_average}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="movie-popularity"
              >
                Popularity
              </label>
              <Input
                aria-describedby={
                  errors.popularity ? "popularity-error" : undefined
                }
                id="movie-popularity"
                placeholder="100"
                type="number"
                value={formData.popularity}
                onChange={(e) =>
                  setFormData({ ...formData, popularity: e.target.value })
                }
              />
              {errors.popularity && (
                <p
                  aria-live="polite"
                  className="mt-1 text-sm text-red-500"
                  id="popularity-error"
                >
                  {errors.popularity}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="movie-language"
              >
                Language
              </label>
              <Input
                aria-describedby={
                  errors.original_language ? "language-error" : undefined
                }
                id="movie-language"
                maxLength={2}
                placeholder="en"
                value={formData.original_language}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    original_language: e.target.value,
                  })
                }
              />
              {errors.original_language && (
                <p
                  aria-live="polite"
                  className="mt-1 text-sm text-red-500"
                  id="language-error"
                >
                  {errors.original_language}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  checked={formData.adult}
                  className="rounded"
                  id="movie-adult"
                  type="checkbox"
                  onChange={(e) =>
                    setFormData({ ...formData, adult: e.target.checked })
                  }
                />
                <span className="text-sm font-medium">Mature Content</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  checked={formData.video}
                  className="rounded"
                  id="movie-video"
                  type="checkbox"
                  onChange={(e) =>
                    setFormData({ ...formData, video: e.target.checked })
                  }
                />
                <span className="text-sm font-medium">Has Video</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : movie ? "Update Movie" : "Add Movie"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieForm;
