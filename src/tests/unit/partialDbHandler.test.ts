import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { FirebaseHandler } from '../../dbHandler'
import { adminMock, deleteMock, settingsMock, loggerMock } from '../mocks/unit'
import { emptyConfigMock, realtimeConfigMock, storageConfigMock } from '../mocks/config'

describe('Instantiate partial dbHandler', () => {
	let dbHandler: FirebaseHandler

	beforeEach(() => {
		adminMock.initializeApp.mockReturnValue({ delete: deleteMock })
		adminMock.firestore.mockReturnValue({ settings: settingsMock })
		adminMock.database.mockReturnValue({})
		adminMock.storage.mockReturnValue({})
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should create a firestore instance', () => {
		dbHandler = new FirebaseHandler({
			// @ts-expect-error
			admin: adminMock,
			logger: loggerMock,
			config: emptyConfigMock,
		})
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(adminMock.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMock.initializeApp).toHaveBeenCalled()
		expect(adminMock.firestore).toHaveBeenCalled()
		expect(settingsMock).toHaveBeenCalled()
	})

	test('should create a realtime database instance', () => {
		dbHandler = new FirebaseHandler({
			// @ts-expect-error
			admin: adminMock,
			logger: loggerMock,
			config: realtimeConfigMock,
		})
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(adminMock.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMock.initializeApp).toHaveBeenCalled()
		expect(adminMock.database).toHaveBeenCalled()
	})

	test('should create a storage instance', () => {
		dbHandler = new FirebaseHandler({
			// @ts-expect-error
			admin: adminMock,
			logger: loggerMock,
			config: storageConfigMock,
		})
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(adminMock.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMock.initializeApp).toHaveBeenCalled()
		expect(adminMock.storage).toHaveBeenCalled()
	})

	test('should throw an error if realtime database is not configured', () => {
		dbHandler = new FirebaseHandler({
			// @ts-expect-error
			admin: adminMock,
			logger: loggerMock,
			config: emptyConfigMock,
		})
		expect(() => dbHandler.getRealtimeInstance()).toThrow()
		expect(loggerMock.error).toHaveBeenCalled()
	})

	test('should throw an error if storage is not configured', () => {
		dbHandler = new FirebaseHandler({
			// @ts-expect-error
			admin: adminMock,
			logger: loggerMock,
			config: emptyConfigMock,
		})
		expect(() => dbHandler.getStorageInstance()).toThrow()
		expect(loggerMock.error).toHaveBeenCalled()
	})
})
