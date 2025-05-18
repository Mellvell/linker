const fileService = require('../services/file.service')

class FileController {
	async getAvatar(req, res) {
		try {
			const { userId, filename } = req.params

			// Получаем абсолютный путь к файлу
			const filePath = await fileService.getAvatar(userId, filename)

			// Отправляем файл
			res.sendFile(filePath, err => {
				if (err) {
					console.error('Ошибка отправки файла:', err)
					return res.status(500).send('Ошибка при отправке файла')
				}
			})
		} catch (error) {
			console.error('Ошибка в контроллере:', error)
			res
				.status(error.status || 500)
				.send(error.message || 'Internal Server Error')
		}
	}
}

module.exports = new FileController()
