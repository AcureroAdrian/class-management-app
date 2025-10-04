export interface ICustomSelectModalProps {
	openModal: boolean
	closeModal: () => void
	title?: string
	options: string[]
	selected: string
	handleSaveOption: (option: string) => void
}

export interface ConfirmationButtonProps {
	disabled?: boolean
}

export interface ModalContainerProps {
	height?: number | string
}
