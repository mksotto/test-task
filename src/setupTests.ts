import '@testing-library/jest-dom';
import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import {setupServer} from "msw/node";
import {mockHandler} from "@/mocks/mockHandler.ts";

const server = setupServer(...mockHandler);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());