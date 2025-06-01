'use client';
import BooksList from 'views/books/books-list';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IBook } from 'types/book';
import { Box, Container, Input, InputLabel, Stack, Select, MenuItem, FormHelperText, Pagination, Button } from '@mui/material';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axios';

const LIMIT = 10; // Default limit

export default function BooksListPage() {
  const router = useRouter();
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState<{ query: string; category: string } | null>(null);

  const fetchBooks = async (query: string, category: string, page: number) => {
    const offset = (page - 1) * LIMIT;

    try {
      const res = await axios.get(`/book/${category}/${query}`, {
        params: { limit: LIMIT, offset }
      });

      const data = res.data;

      console.log('Fetched books:', data);

      if (data.entries) {
        setBooks(data.entries);
        // Get the total number of pages based on the total records and limit
        const totalRecords = data.pagination?.totalRecords ?? data.entries.length;
        setTotalPages(Math.ceil(totalRecords / LIMIT));
      } else if (data.entry) {
        setBooks([data.entry]);
        setTotalPages(1);
      } else {
        setBooks([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalPages(1);
    }
  };

  function handleSubmit(
    values: { query: string; category: string },
    setErrors: (
      errors: FormikErrors<{
        query: string;
        category: string;
      }>
    ) => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    setSubmitting(true);
    setPage(1); // Reset to page 1 on new search
    setSearchParams(values); // Trigger useEffect
    setSubmitting(false);
  }

  useEffect(() => {
    if (searchParams) {
      fetchBooks(searchParams.query, searchParams.category, page);
    }
  }, [searchParams, page]);

  return (
    <Container>
      <Formik
        initialValues={{
          query: '',
          category: 'title'
        }}
        validationSchema={Yup.object().shape({
          query: Yup.string()
            .required('Search query is required')
            .test('no-leading-trailing-whitespace', 'Query cannot start or end with spaces', (value) => value === value.trim()),
          category: Yup.string().oneOf(['title', 'author', 'isbn', 'rating', 'year'], 'Invalid search category')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          handleSubmit(values, setErrors, setSubmitting);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mb: 4 }}>
              <InputLabel htmlFor="query">Search Query</InputLabel>
              <Input
                id="query"
                name="query"
                value={values.query}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.query && errors.query)}
                fullWidth
              />
              {touched.query && errors.query && <FormHelperText error>{errors.query}</FormHelperText>}
              <InputLabel htmlFor="category">Search Category</InputLabel>
              <Select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.category && errors.category)}
                fullWidth
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="isbn">ISBN</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </Stack>
            <Box sx={{ textAlign: 'left' }}>
              <Button type="submit" variant="contained" color="primary" disabled={!values.query || !values.category}>
                Search
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <BooksList books={books} />

      {books.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
        </Box>
      )}
    </Container>
  );
}
