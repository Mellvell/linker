import type { ReactNode } from "react";

export default interface FormTypes {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  formClassName?: string;
}