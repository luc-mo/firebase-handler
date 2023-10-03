export class FirestoreError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'FirestoreError'
	}
}
