'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';

interface CreateBookFormData {
  id: string;
  title: string;
  original_title: string;
  authors: string;
  isbn13: string;
  publication: string;
  publisher: string;
  description: string;
  image_url: string;
}

const initialFormData: CreateBookFormData = {
  id: '',
  title: '',
  original_title: '',
  authors: '',
  isbn13: '',
  publication: '',
  publisher: '',
  description: '',
  image_url: ''
};

export default function CreateBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateBookFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof CreateBookFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.id.trim()) return 'Book ID is required';
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.authors.trim()) return 'Author(s) is required';
    if (!formData.isbn13.trim()) return 'ISBN-13 is required';
    if (formData.isbn13.length !== 13) return 'ISBN-13 must be exactly 13 digits';
    if (!formData.publication.trim()) return 'Publication date is required';
    
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
        id: formData.id,
        title: formData.title,
        original_title: formData.original_title || formData.title,
        authors: formData.authors,
        isbn13: formData.isbn13,
        publication: formData.publication,
        publisher: formData.publisher,
        description: formData.description,
        image_url: formData.image_url,
        // Default values for new books
        ratings: {
          average: 0,
          count: 0
        },
        icons: {
          large: formData.image_url || '/placeholder-book.jpg',
          small: formData.image_url || '/placeholder-book.jpg'
        }
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Book data to be created:', bookData);

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
            <TextField
              fullWidth
              label="Title *"
              value={formData.title}
              onChange={handleInputChange('title')}
              variant="outlined"
              required
            />
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
              label="Author(s) *"
              value={formData.authors}
              onChange={handleInputChange('authors')}
              variant="outlined"
              required
              helperText="Separate multiple authors with commas"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Publisher"
              value={formData.publisher}
              onChange={handleInputChange('publisher')}
              variant="outlined"
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
              label="ISBN-13 *"
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
              label="Publication Date *"
              value={formData.publication}
              onChange={handleInputChange('publication')}
              variant="outlined"
              required
              placeholder="e.g., 2024 or January 2024"
              helperText="Publication year or date"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Book ID *"
              value={formData.id}
              onChange={handleInputChange('id')}
              variant="outlined"
              required
              helperText="Unique identifier for the book"
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={handleInputChange('description')}
              variant="outlined"
              multiline
              rows={4}
              placeholder="Brief description of the book..."
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
