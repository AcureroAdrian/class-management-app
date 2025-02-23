export interface ICustomSelectModalProps {
	openModal: boolean
	closeModal: () => void
	title: string
	options: string[]
	selected: string
	handleSaveOption: (selected: string) => void
}
