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
import type { Movie } from "@/types/movie";

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
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    original_title: movie?.original_title || "",
    overview: movie?.overview || "",
    release_date: movie?.release_date || "",
    vote_average: movie?.vote_average?.toString() || "",
    popularity: movie?.popularity?.toString() || "",
    original_language: movie?.original_language || "",
    adult: !movie?.adult || false,
    video: movie?.video || false,
  });

  // Reset form when movie changes
  useEffect(() => {
    setFormData({
      title: movie?.title || "",
      original_title: movie?.original_title || "",
      overview: movie?.overview || "",
      release_date: movie?.release_date || "",
      vote_average: movie?.vote_average?.toString() || "",
      popularity: movie?.popularity?.toString() || "",
      original_language: movie?.original_language || "",
      adult: !movie?.adult || false,
      video: movie?.video || false,
    });
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      original_title: formData.original_title,
      overview: formData.overview,
      release_date: formData.release_date,
      vote_average: parseFloat(formData.vote_average) || 0,
      popularity: parseFloat(formData.popularity) || 0,
      original_language: formData.original_language,
      adult: !formData.adult,
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
              <label className="mb-2 block text-sm font-medium">Title</label>
              <Input
                required
                placeholder="Movie title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Original Title
              </label>
              <Input
                placeholder="Original title"
                value={formData.original_title}
                onChange={(e) =>
                  setFormData({ ...formData, original_title: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Overview</label>
            <textarea
              required
              className="h-24 w-full resize-none rounded-md border border-gray-300 p-3"
              placeholder="Movie overview"
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Release Date
              </label>
              <Input
                required
                type="date"
                value={formData.release_date}
                onChange={(e) =>
                  setFormData({ ...formData, release_date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Rating</label>
              <Input
                required
                max="10"
                min="0"
                placeholder="0.0"
                step="0.1"
                type="number"
                value={formData.vote_average}
                onChange={(e) =>
                  setFormData({ ...formData, vote_average: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Popularity
              </label>
              <Input
                required
                placeholder="0.0"
                step="0.1"
                type="number"
                value={formData.popularity}
                onChange={(e) =>
                  setFormData({ ...formData, popularity: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Language</label>
              <Input
                required
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
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  checked={formData.adult}
                  className="rounded"
                  type="checkbox"
                  onChange={(e) =>
                    setFormData({ ...formData, adult: e.target.checked })
                  }
                />
                <span className="text-sm font-medium">For Family</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  checked={formData.video}
                  className="rounded"
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
