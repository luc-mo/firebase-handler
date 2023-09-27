interface DbHandler {
	getFirestoreInstance: () => FirestoreDb
	getRealtimeInstance: () => RealtimeDb
	getStorageInstance: () => StorageDb
	disconnect: () => void
}
