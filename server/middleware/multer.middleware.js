const multer = require('multer')

// Фильтр для типов файлов
const fileFilter = (req, file, cb) => {
	const allowedTypes = [
		'image/jpeg',
		'image/png',
		'image/gif', // Изображения
		'text/plain', // Текстовые файлы (.txt)
		'application/pdf', // PDF
		'application/msword', // .doc
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
	]

	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(
			new Error(
				'Недопустимый тип файла! Поддерживаются изображения, текстовые файлы, PDF и DOC/DOCX.'
			),
			false
		)
	}
}

// Инициализация Multer с хранением в памяти
const upload = multer({
	storage: multer.memoryStorage(), // Храним файл в памяти
	limits: { fileSize: 10 * 1024 * 1024 }, // Ограничение размера файла (10MB)
	fileFilter: fileFilter,
})

module.exports = upload
