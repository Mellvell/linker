export default interface ContactProps {
  id: number;
  name: string;
  isOnline: boolean;
  avatar: string;
  onClick: () => void;
}