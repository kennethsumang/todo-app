export default interface FetchTodoDto {
  id?: string;
  userId?: string;
  limit?: number;
  page?: number;
  priority?: number;
  status?: number;
  title?: string;
  details?: string;
}