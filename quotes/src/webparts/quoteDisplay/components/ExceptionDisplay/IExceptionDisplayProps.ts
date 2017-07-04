export interface IExceptionDisplayProps {
  message: string;
  statusCode: number;
  statusText: string;
  onEditWebPart: () => void;
}
