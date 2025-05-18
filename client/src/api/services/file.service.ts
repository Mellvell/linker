import api  from '../index'

export default class FileService{
  static async getAvatar(avatar: string): Promise<string | undefined> {
    try {      
      const response = await api.get(`/files/avatars${avatar}`, {
        responseType: 'blob'
      })
      
      return URL.createObjectURL(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }
}