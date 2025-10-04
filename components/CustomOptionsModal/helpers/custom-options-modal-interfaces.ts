export interface ICustomOptionsModalProps {
	openModal: boolean
	closeModal: () => void
	title: string
	options: string[]
	selected: string[]
	handleSaveOptions: (selected: string[]) => void
}

export interface ConfirmationButtonProps {
	disabled?: boolean
}

export interface ModalContainerProps {
	height?: number | string
}
