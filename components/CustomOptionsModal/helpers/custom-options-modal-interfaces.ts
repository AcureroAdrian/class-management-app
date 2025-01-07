export interface ICustomOptionsModalProps {
	openModal: boolean
	closeModal: () => void
	title: string
	options: string[]
	selected: string[]
	handleSaveOptions: (selected: any) => void
}
