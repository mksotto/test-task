import { http, HttpResponse } from 'msw';
import { Human } from '@/types/api';
import { PageResponse } from '@/types/PageResponse';

const mockHumans: Human[] = [
  {
    id: 'bd78ef41-e96f-4234-86b9-67d0e3eebecf',
    firstName: 'Иван',
    lastName: 'Иванов',
    age: 25,
    city: 'Москва',
    country: 'Россия',
    email: 'ivan@example.com'
  },
  {
    id: '4180d096-1e66-4d0f-8acd-e7d35b60fe5a',
    firstName: 'Петр',
    lastName: 'Петров',
    age: 30,
    city: 'Санкт-Петербург',
    country: 'Россия',
    email: 'petr@example.com'
  }
];

export const mockHandler = [
  // GET /api/humans
  http.get('/api/humans', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('_page') || '1');
    const perPage = parseInt(url.searchParams.get('_per_page') || '10');
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = mockHumans.slice(start, end);
    const totalPages = Math.ceil(mockHumans.length / perPage);

    const response: PageResponse<Human> = {
      first: 1,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
      last: totalPages,
      pages: totalPages,
      items: mockHumans.length,
      data,
    };
    return HttpResponse.json(response);
  }),

  // POST /api/humans
  http.post(`/api/humans`, async ({ request }) => {
    const newUser = await request.json() as Human;
    mockHumans.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),
];