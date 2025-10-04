export interface IConfirmationDeleteModalProps {
	openModal: boolean
	closeModal: () => void
	title: string
	handleConfirm: () => void
	loadingDelete?: boolean
	errorDelete?: string
}
