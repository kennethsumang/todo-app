"use client";

import requestCreateTodo from "@/app/_requests/todo/create-todo.request";
import requestUpdateTodo from "@/app/_requests/todo/edit-todo.request";
import useTodoStore from "@/app/_store/todo.store";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";

interface Props {
 todoId?: string;
}

const TodoFormActions: React.FC<Props> = () => {
  const pathname = usePathname();
  const router = useRouter();

  let isCreateForm = false;
  let todoId: string|undefined = undefined;
  const splittedPath = pathname.split("/");
  if (_.last(splittedPath) === "new") {
    isCreateForm = true;
  } else {
    const editPath = [...splittedPath];
    editPath.pop();
    todoId = _.last(editPath);
  }

  const { form } = useTodoStore();
  const { mutateAsync: mutateCreateTodo } = useMutation({
    mutationFn: () => requestCreateTodo(form),
    onSuccess: (data) => {
      router.push(`/todos/${data.todo.id}`);
    }
  });
  const { mutateAsync: mutateUpdateTodo } = useMutation({
    mutationFn: () => requestUpdateTodo(todoId!, form),
    onSuccess: (data) => {
      router.push(`/todos/${data.todo.id}`);
    }
  })  

  function handleCancelButtonClick() {
    if (isCreateForm) {
      router.push("/todos");
      return;
    }

    const newPath = [...splittedPath];
    newPath.pop();
    router.push(newPath.join("/"));
  }

  async function handleSaveButtonClick() {
    if (isCreateForm) {
      await mutateCreateTodo();
      return;
    }

    await mutateUpdateTodo();
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleCancelButtonClick}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveButtonClick}
      >
        Save
      </Button>
    </>
  );
}

export default TodoFormActions;