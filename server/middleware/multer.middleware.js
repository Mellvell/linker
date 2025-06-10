const multer = require('multer')
const iconv = require('iconv-lite')

// Фильтр для типов файлов
const fileFilter = (req, file, cb) => {
	const allowedTypes = [
		'image/jpeg',
		'image/png',
		'image/gif', 
		'text/plain', 
		'application/pdf', 
		'application/msword', 
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
	]

	file.originalname = iconv.decode(
		Buffer.from(file.originalname, 'binary'),
		'utf-8'
	)

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
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 }, 
	fileFilter: fileFilter,
})

module.exports = upload
