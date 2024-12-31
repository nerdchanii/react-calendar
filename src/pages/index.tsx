import Button from "@/components/Button";
import Calendar from "@/components/Calendar";
import Modal from "@/components/modal/modal";
import { Todo } from "@/model/Todo.model";
import { useGetTodos, useUpdateTodo } from "@/queries/todo.queries";
import { all } from "axios";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { Event } from "react-big-calendar";

function todoTranToEvent(todos: Todo[] | undefined): Event[] {
  if (!todos) {
    return [];
  }
  return todos.map((todo) => ({
    ...todo,
    start: dayjs(todo.start).toDate(),
    end: dayjs(todo.end).toDate(),
    allDay: false,
  }));
}

export default function Home() {
  const { data: todos, isLoading, isError, error } = useGetTodos();
  const { mutate } = useUpdateTodo();
  const router = useRouter();

  const onClickNavigate = () => {
    router.push("/calendar");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <header className="py-2 bg-violet-500 text-white">
        <h1 className="">Welcome to my site</h1>
      </header>
      <Modal>
        <Calendar events={todoTranToEvent(todos)} />
      </Modal>
      {todos?.map((todo) => {
        const key = `${todo.id}/${todo.title}`;
        console.log(todo.done);
        return (
          <div key={key} className="border p-2 m-2">
            <h3>{todo.title}</h3>
            <section className="flex">
              <input
                type="checkbox"
                checked={todo.done}
                onClick={() => {
                  mutate({ ...todo, done: !todo.done });
                }}
                className="flex-grow-0 w-6 h-6 m-2"
              />
              <div className="flex-grow">
                <p>{todo.author}</p>
                <p>{todo.description}</p>
              </div>
              <p className="text-right self-end">
                {todo.start}~{todo.end}
              </p>
            </section>
          </div>
        );
      })}
    </main>
  );
}
