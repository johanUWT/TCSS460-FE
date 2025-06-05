'use client';
import BooksList from 'views/books/books-list';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { IBook } from 'types/book';
import { Box, Container, Input, InputLabel, Stack, Select, MenuItem, FormHelperText, Pagination, Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axios';

const LIMIT = 10;
const VALID_CATEGORIES = ['title', 'author', 'isbn', 'rating', 'year'];

export default function BooksListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('query')?.trim() || '';
  const rawCategory = searchParams.get('category') || 'title';
  const category = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : 'title';
  const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);

  const [books, setBooks] = useState<IBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (query: string, category: string, page: number) => {
    if (!query) return;
    const offset = (page - 1) * LIMIT;

    try {
      const res = await axios.get(`/book/${category}/${query}`, {
        params: { limit: LIMIT, offset }
      });

      const data = res.data;
      console.log(data);

      if (data.entries) {
        setBooks(data.entries);
        const totalRecords = data.pagination?.totalRecords ?? data.entries.length;
        setTotalPages(data.pagination ? Math.ceil(totalRecords / LIMIT) : 1);
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

  useEffect(() => {
    if (query && category) {
      fetchBooks(query, category, page);
    } else {
      setBooks([]);
    }
  }, [query, category, page]);

  const handleSearch = (values: { query: string; category: string }) => {
    const params = new URLSearchParams({
      query: values.query,
      category: values.category,
      page: '1'
    });
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams({
      query,
      category,
      page: value.toString()
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Search Books
      </Typography>

      <Formik
        enableReinitialize
        initialValues={{
          query,
          category
        }}
        validationSchema={Yup.object().shape({
          query: Yup.string()
            .required('Search query is required')
            .test('no-leading-trailing-whitespace', 'Query cannot start or end with spaces', (value) => value === value?.trim()),
          category: Yup.string().oneOf(VALID_CATEGORIES, 'Invalid search category')
        })}
        onSubmit={(values) => handleSearch(values)}
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
                {VALID_CATEGORIES.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Box sx={{ textAlign: 'left' }}>
              <Button type="submit" variant="contained" color="primary" disabled={!values.query}>
                Search
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <BooksList books={books} />

      {books.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Container>
  );
}
