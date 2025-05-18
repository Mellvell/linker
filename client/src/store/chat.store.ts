import { makeAutoObservable, set } from "mobx"
import ChatService from "../api/services/chat.service"
import type Chat from "../types/api.types/chat.types"
import type { User } from "../types/api.types/user.types"
import UserService from "../api/services/user.service"

export default class ChatStore {
  chats: Chat[] = []
  interlocutor = {} as User
  constructor() {
    makeAutoObservable(this)
  }

  setInterlocutor(user: User) {
    this.interlocutor = user
  }
  setChats(chats: Chat[]) {
    this.chats = chats
  }

  async getUser(userId: string) {
    try {
      const response = await UserService.getUser(userId)
      if (response) {
        this.setInterlocutor(response.data)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async getChats() {
    try {
      const response = await ChatService.getChats()
      this.setChats(response.data)
    } catch (error) {
      console.error(error)
    }
  }
}


export const chatStore = new ChatStore()
