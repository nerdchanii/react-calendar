import { Todo } from "@/model/Todo.model";
import apiClient from "../utils/axios";

export const getTodos = async () => {
  const response = await apiClient.get<{ todos: Todo[] }>("/");
  const { data } = response;
  return data.todos;
};

export const createTodo = async (
  data: Omit<Todo, "id" | "created_at" | "updated_at">
) => {
  return apiClient.post("/", data);
};

export const updateTodo = async ({ id, ...data }: Todo) => {
  return apiClient.put(`/${id}`, { id, ...data });
};

export const deleteTodo = async (id: number) => {
  return apiClient.delete(`/${id}`);
};

export const getTodo = async (id: number) => {
  return apiClient.get<Todo>(`/${id}`);
};
