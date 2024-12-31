import { Calendar, dayjsLocalizer, Event, SlotInfo } from "react-big-calendar";
import dayjs from "dayjs";
import { Todo } from "@/model/Todo.model";
import Modal, { useModal } from "../modal/modal";
import { useCreateTodo } from "@/queries/todo.queries";
import { useEffect } from "react";
import TodoCreatedAlert from "./TodoCreatedAlert";
import classNames from "classnames";
import { eventNames } from "process";

const localizer = dayjsLocalizer(dayjs);
type Props = {
  events: Event[];
};

const formats = {
  eventTimeRangeFormat: () => "", // 시간 범위 표시 제거
  timeRangeFormat: () => "", // 시간 범위 표시 제거
};

const EventsDetailView = ({ event }: { event: Event }) => {
  return (
    <div>
      <h2 className={`${event.done ? "line-through" : ""} text-bold`}>
        {event.title}
      </h2>
    </div>
  );
};

const CalendarContainer = ({ events }: Props) => {
  const { isOpen, open, close, setContent } = useModal();
  const { mutate, isLoading, isError, isSuccess } = useCreateTodo();

  const createTodo = (slotInfo: SlotInfo) => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;

    const todo: Omit<Todo, "id" | "created_at" | "updated_at"> = {
      title,
      type:
        (document.getElementById("type") as HTMLSelectElement).value ||
        "기본일정",
      description,
      author: "test user",
      done: false,
      start: dayjs(slotInfo.start).format("YYYY-MM-DD"),
      end: dayjs(slotInfo.end).format("YYYY-MM-DD"),
    };
    mutate(todo);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        close();
      }, 500);
    }
  }, [isSuccess, isError, setContent]);

  const eventPropGetter = (event: Event) => {
    const res = { id: event.id, "data-event-title": event.title };
    if (event.done) {
      return { ...res, className: "text-slate-400 bg-slate-50 line-through" };
    }
    switch (event.type) {
      case "42":
        return {
          className: "text-blue-700 bg-slate-50",
          // onContextMenuCapture: (e: any) => {
          //   e.preventDefault();
          //   console.log("42");
          // },
        };
      case "42gg":
        return {
          className: "text-violet-700 bg-slate-50",
        };
      case "일정":
        return {
          classNames: "text-slack-700 bg-transparent",
        };
      default:
        return {
          className: "text-black bg-slate-50",
        };
    }
  };
  const processEvents = (events: Event[]) => {
    return events.flatMap((event) => [
      // 시작일 이벤트
      {
        ...event,
        title: `[시] ${event.title}`,
        end: dayjs(event.start).add(1, "day").toDate(), // 하루만 표시
        isStart: true,
      },
      // 종료일 이벤트
      {
        ...event,
        title: `[끝] ${event.title}`,
        start: event.end,
        end: dayjs(event.end).add(1, "day").toDate(),
        isStart: false,
      },
    ]);
  };

  return (
    <div>
      <Calendar
        events={events}
        formats={formats}
        allDayAccessor={"allDay"}
        localizer={localizer}
        elementProps={{}}
        eventPropGetter={eventPropGetter}
        // events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{ height: 800 }}
        selectable={true}
        views={["month"]}
        step={60}
        onSelectEvent={(event) => {
          console.log(event);
          open();
          setContent(<EventsDetailView event={event} />);
        }}
        onSelectSlot={(slotInfo) => {
          open();
          setContent(
            isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="p-2 flex-col">
                <h2 className="text-xl font-bold pb-2">할 일 추가</h2>
                <select
                  className="w-full p-2 my-2 border-violet-300 border-2 rounded-md"
                  id="type"
                >
                  <option value="42">42일정</option>
                  <option value="42gg">42gg</option>
                  <option value="일정">일정</option>
                </select>
                <div className="flex gap-2">
                  <label htmlFor="start" className="text-lg font-semibold">
                    일시
                  </label>
                  <input
                    disabled
                    type="datetime"
                    id="start"
                    value={dayjs(slotInfo.start).format("YYYY-MM-DD")}
                  />
                  <span>~</span>
                  <input
                    disabled
                    type="datetime"
                    id="end"
                    value={dayjs(slotInfo.end).format("YYYY-MM-DD")}
                  />
                </div>
                <div>
                  <label htmlFor="title" className="text-lg font-semibold">
                    제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    className="w-full p-2 my-2 border-violet-300 border-2 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="text-lg font-semibold"
                  >
                    설명
                  </label>
                  <textarea
                    placeholder="Description"
                    id="description"
                    className="w-full p-2 my-2 border-violet-300 border-2 rounded-md min-h-32"
                  />
                </div>
                <div
                  className="flex justify-end"
                  onClick={(e) => createTodo(slotInfo)}
                >
                  <button className="bg-violet-700 text-white p-2 rounded-md justify-self-end">
                    Create
                  </button>
                </div>
              </div>
            )
          );
        }}
        popup={true}
        draggableAccessor={(event) => !event.done}
      />
    </div>
  );
};

export default CalendarContainer;
