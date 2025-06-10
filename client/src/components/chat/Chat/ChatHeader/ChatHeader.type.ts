import type {User} from '../../../../types/api.types/user.types';

export default interface ChatHeaderProps {
  selectedUser: User;
  chatId: number;
  setSelectedContact: (contact: null) => void;
}