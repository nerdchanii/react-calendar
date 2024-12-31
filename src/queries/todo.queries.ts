/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   todo.queries.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: yechakim <yechakim@student.42seoul.kr>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/30 17:23:43 by yechakim          #+#    #+#             */
/*   Updated: 2024/12/31 18:09:09 by yechakim         ###   ########seoul.kr  */
/*                                                                            */
/* ************************************************************************** */

import { Todo } from "@/model/Todo.model";
import * as todoRepo from "@/repository/todo.repo";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetTodos = () => {
  return useQuery<Todo[]>("todos", todoRepo.getTodos);
};

export const useGetTodo = (id: number) => {
  return useQuery<Todo>("todos", async () => {
    const res = await todoRepo.getTodo(id);
    return res.data;
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Omit<Todo, "id" | "created_at" | "updated_at">,
    Error,
    Omit<Todo, "id" | "created_at" | "updated_at">
  >(
    async (todo: Omit<Todo, "id" | "created_at" | "updated_at">) => {
      const res = await todoRepo.createTodo(todo);
      return res.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    }
  );
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo>(
    async (todo: Todo) => {
      const res = await todoRepo.updateTodo(todo);
      return res.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    }
  );
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>(
    async (id: number) => {
      const res = await todoRepo.deleteTodo(id);
      return res.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    }
  );
};
