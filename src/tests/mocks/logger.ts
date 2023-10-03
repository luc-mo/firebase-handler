import { vi } from 'vitest'

export const logger = {
  info: vi.fn(),
  error: vi.fn(),
}