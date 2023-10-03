import { vi } from 'vitest'

// Snapshot methods mocks
export const data = vi.fn()

// Document methods mocks
export const get = vi.fn()
export const create = vi.fn()
export const set = vi.fn()
export const update = vi.fn()
export const doc = vi.fn()

// Firestore methods mocks
export const settings = vi.fn()
export const collection = vi.fn()
export const firestore = vi.fn()

// Realtime database methods mocks
export const database = vi.fn()

// Storage methods mocks
export const storage = vi.fn()
export const terminate = vi.fn()

// Firebase admin library mocks
export const deleteMock = vi.fn()
export const initializeApp = vi.fn()
export const applicationDefault = vi.fn()
export const credential = { applicationDefault }

export const admin = {
	initializeApp,
	firestore,
	database,
	storage,
	credential,
}

export const initializeMocks = () => {
	// Document methods mocks
	doc.mockReturnValue({ get, create, set, update })
	collection.mockReturnValue({ doc, get })
	firestore.mockReturnValue({ settings, collection, terminate })

	// Realtime database methods mocks
	database.mockReturnValue({})

	// Storage methods mocks
	storage.mockReturnValue({})

	// Firebase admin library mocks
	initializeApp.mockReturnValue({ delete: deleteMock })
}
