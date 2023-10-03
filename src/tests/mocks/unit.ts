import { vi } from 'vitest'

export const adminMock = {
	initializeApp: vi.fn(),
	firestore: vi.fn(),
	database: vi.fn(),
	storage: vi.fn(),
	credential: {
		applicationDefault: vi.fn(),
	},
}

export const deleteMock = vi.fn()
export const settingsMock = vi.fn()
export const terminateMock = vi.fn()

export const loggerMock = {
	info: vi.fn(),
	error: vi.fn(),
}
