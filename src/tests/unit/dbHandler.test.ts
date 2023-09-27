import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { FirebaseHandler } from '../../dbHandler'
import { adminMock, deleteMock, settingsMock, loggerMock } from '../mocks/unit'

const configMock = {
	firebase: {
		databaseURL: 'realtime database test',
		storageBucket: 'storage bucket test',
	},
}

describe('Instantiate dbHandler', () => {
	let dbHandler: FirebaseHandler

	beforeEach(() => {
		adminMock.initializeApp.mockReturnValue({ delete: deleteMock })
		adminMock.firestore.mockReturnValue({ settings: settingsMock })
		adminMock.database.mockReturnValue({})
		adminMock.storage.mockReturnValue({})
		// @ts-expect-error
		dbHandler = new FirebaseHandler({ admin: adminMock, logger: loggerMock, config: configMock })
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should be a function', () => {
		expect(typeof FirebaseHandler).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof dbHandler).toBe('object')
		expect(typeof dbHandler.getFirestoreInstance).toBe('function')
		expect(typeof dbHandler.getRealtimeInstance).toBe('function')
		expect(typeof dbHandler.getStorageInstance).toBe('function')
		expect(typeof dbHandler.disconnect).toBe('function')
	})

	test('should create a database instance', () => {
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(adminMock.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMock.initializeApp).toHaveBeenCalled()
		expect(adminMock.firestore).toHaveBeenCalled()
		expect(settingsMock).toHaveBeenCalled()
	})

	test('should create only one database instance', () => {
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(loggerMock.info).toHaveBeenCalledTimes(2)
		expect(adminMock.credential.applicationDefault).toHaveBeenCalledTimes(1)
		expect(adminMock.initializeApp).toHaveBeenCalledTimes(1)
		expect(adminMock.firestore).toHaveBeenCalledTimes(1)
		expect(settingsMock).toHaveBeenCalledTimes(1)
	})

	test('should create a realtime database instance', () => {
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(adminMock.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMock.initializeApp).toHaveBeenCalled()
		expect(adminMock.database).toHaveBeenCalled()
	})

	test('should create only one realtime database instance', () => {
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(dbHandler.getRealtimeInstance()).toBeDefined()
		expect(loggerMock.info).toHaveBeenCalledTimes(2)
		expect(adminMock.credential.applicationDefault).toHaveBeenCalledTimes(1)
		expect(adminMock.initializeApp).toHaveBeenCalledTimes(1)
		expect(adminMock.database).toHaveBeenCalledTimes(1)
	})

	test('should create a storage instance', () => {
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(adminMock.credential.applicationDefault).toHaveBeenCalled()
		expect(adminMock.initializeApp).toHaveBeenCalled()
		expect(adminMock.storage).toHaveBeenCalled()
	})

	test('should create only one storage instance', () => {
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(dbHandler.getStorageInstance()).toBeDefined()
		expect(loggerMock.info).toHaveBeenCalledTimes(2)
		expect(adminMock.credential.applicationDefault).toHaveBeenCalledTimes(1)
		expect(adminMock.initializeApp).toHaveBeenCalledTimes(1)
		expect(adminMock.storage).toHaveBeenCalledTimes(1)
	})

	test('should disconnect from database', () => {
		expect(dbHandler.getFirestoreInstance()).toBeDefined()
		expect(dbHandler.disconnect()).toBeUndefined()
		expect(deleteMock).toHaveBeenCalled()
	})
})
