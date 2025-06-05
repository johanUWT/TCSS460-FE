'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Grid, Alert, CircularProgress } from '@mui/material';
import axios from 'utils/axios';

interface CreateBookFormData {
  id: string;
  title: string;
  original_title: string;
  authors: string;
  isbn13: string;
  publication: string;
  image_url: string;
}

const initialFormData: CreateBookFormData = {
  id: '',
  title: '',
  original_title: '',
  authors: '',
  isbn13: '',
  publication: '',
  image_url: ''
};

const DEFAULT_IMAGE_URL = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png';

export default function CreateBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateBookFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof CreateBookFormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.authors.trim()) return 'Author(s) is required';
    if (!formData.isbn13.trim()) return 'ISBN-13 is required';
    if (formData.isbn13.length !== 13) return 'ISBN-13 must be exactly 13 digits';
    if (!formData.publication.trim() || !Number.isInteger(Number(formData.publication)))
      return 'Publication year is required and must be an integer';

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call when ready to connect to 3rd-party Book API
      // For now, we'll simulate the API call

      const bookData = {
        id: Math.floor(Math.random() * (Math.pow(2, 32) - Math.pow(2, 31))) + Math.pow(2, 31), // Generate a random ID for the book
        isbn13: formData.isbn13,
        authors: formData.authors,
        publication_year: formData.publication,
        original_title: formData.original_title || formData.title,
        title: formData.title,
        rating_avg: 0,
        rating_count: 0,
        ratings_1_star: 0,
        ratings_2_star: 0,
        ratings_3_star: 0,
        ratings_4_star: 0,
        ratings_5_star: 0,
        image_url: formData.image_url || DEFAULT_IMAGE_URL,
        image_small_url: formData.image_url || DEFAULT_IMAGE_URL
      };

      console.log('Book data to be created:', bookData);

      const response = await axios.post('/book', bookData);
      console.log('Book created successfully:', response.data);
      setSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData(initialFormData);
        setSuccess(false);
        // Optionally redirect to books list
        // router.push('/books');
      }, 2000);
    } catch (err) {
      console.error('Error creating book:', err);
      setError('Failed to create book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError(null);
    setSuccess(false);
  };

  const handleCancel = () => {
    router.push('/books');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Typography variant="h4" component="h1" gutterBottom className="text-gray-900 font-bold">
        Create New Book Entry
      </Typography>

      <Typography variant="body1" className="text-gray-600 mb-6">
        Fill in the information below to add a new book to the library.
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="mb-4">
          Book created successfully! The form will reset shortly.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <TextField fullWidth label="Title" value={formData.title} onChange={handleInputChange('title')} variant="outlined" required />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Original Title"
              value={formData.original_title}
              onChange={handleInputChange('original_title')}
              variant="outlined"
              helperText="Leave blank if same as title"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Author(s)"
              value={formData.authors}
              onChange={handleInputChange('authors')}
              variant="outlined"
              required
              helperText="Separate multiple authors with commas"
            />
          </Grid>

          {/* Publication Details */}
          <Grid item xs={12}>
            <Typography variant="h6" className="text-gray-800 mb-3 mt-4">
              Publication Details
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ISBN-13"
              value={formData.isbn13}
              onChange={handleInputChange('isbn13')}
              variant="outlined"
              required
              inputProps={{ maxLength: 13 }}
              helperText="13-digit ISBN number"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Publication Year"
              value={formData.publication}
              onChange={handleInputChange('publication')}
              variant="outlined"
              required
              placeholder="e.g., 2024"
              helperText="Year the book was published"
            />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant="h6" className="text-gray-800 mb-3 mt-4">
              Additional Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Book Cover Image URL"
              value={formData.image_url}
              onChange={handleInputChange('image_url')}
              variant="outlined"
              placeholder="https://example.com/book-cover.jpg"
              helperText="Optional: URL to book cover image"
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 3 }}>
              <Button variant="outlined" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
              <Button variant="outlined" onClick={handleReset} disabled={loading}>
                Reset Form
              </Button>
              <Button type="submit" variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}>
                {loading ? 'Creating...' : 'Create Book'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
