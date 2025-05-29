'use client';
import BooksList from 'views/books/books-list';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IBook } from 'types/book';
import { Box, Container, Input, InputLabel, Stack, Select, MenuItem, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// ==============================|| BOOKS LIST PAGE ||============================== //

export default function BooksListPage() {
  const router = useRouter();
  const [books, setBooks] = useState<IBook[]>([]);

  function handleSearch() {}

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
            .test('no-leading-trailing-whitespace', 'Query cannot start or end with spaces', (value) => value === value.trim())
            .min(2, 'Query must be at least 2 characters long'),
          category: Yup.string().oneOf(['title', 'author', 'isbn', 'rating', 'year'], 'Invalid search category')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          console.log('Search values:', values);
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
            <Box sx={{ textAlign: 'right' }}>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
}
