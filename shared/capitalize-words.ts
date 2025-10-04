const capitalizeWords = (phrase: string) => {
	if (!phrase) return ''
	if (!phrase?.length) return ''

	return phrase.replace(/\b\w/g, (char) => char.toUpperCase())
}

export default capitalizeWords
