import { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddListButton";
import AddTaskModal from "../components/AddTaskModal";
import ViewAndEditTaskModal from "../components/ViewAndEditModal";
import { useDispatch, useSelector } from "react-redux";
import { addList, addTask, editTask, deleteTask } from "../redux/listSlice";
import { RootState } from "../redux/store";
import { toast } from "react-hot-toast";

const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

interface ListProps {
  id: string;
  title: string;
  tasks: Task[];
  onClickAddTask: () => void;
  onClickTask: () => void;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task>>;
}

interface Task {
  id: string;
  title: string;
  desc: string;
}

interface List {
  id: string;
  title: string;
  tasks: Task[];
}

const List: React.FC<ListProps> = ({
  id,
  title,
  tasks,
  onClickAddTask,
  onClickTask,
  setSelectedList,
  setSelectedTask,
}) => {
  return (
    <div className="w-full min-w-3xs max-w-xs mx-4">
      <Card
        title={title}
        extra={<div>จำนวน task : {tasks.length}</div>}
        className="shadow-lg"
      >
        <div className="space-y-2">
          {tasks.map((task) => (
            <Button
              block
              key={`${task.id}`}
              className="bg-gray-100 p-2 rounded-md shadow-sm text-left"
              onClick={() => {
                setSelectedList(id);
                onClickTask();
                setSelectedTask(task);
              }}
            >
              {task.title}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <Button
            color="default"
            variant="solid"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedList(id);
              onClickAddTask();
            }}
            block
          >
            Add Task
          </Button>
        </div>
      </Card>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [selectedList, setSelectedList] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: "",
    title: "",
    desc: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state.list);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  //   console.log("list list state", state);
  const handleAddList = (title: string) => {
    dispatch(
      addList({
        id: generateRandomId().toString(),
        title: title,
        tasks: [],
      })
    );

    toast.success("Add list successful");
  };

  const onSubmitAddTask = (title: string, desc: string) => {
    dispatch(
      addTask({
        id: selectedList,
        task: { id: generateRandomId().toString(), title: title, desc: desc },
      })
    );

    toast.success("Add task successful");
  };

  const onSubmitEditTask = (title: string, desc: string) => {
    dispatch(
      editTask({
        id: selectedList,
        task: { id: selectedTask.id, title: title, desc: desc },
      })
    );

    toast.success("Edit task successful");
  };

  const onDelteTask = () => {
    dispatch(deleteTask({
      id: selectedList,
      taskId: selectedTask.id,
    }))

    toast.success("Delete task successful");
  }

  useEffect(() => {
    console.log("state change", state);
  }, [state]);
  return (
    <div className="flex p-4 overflow-auto h-full">
      <div className="flex space-x-4">
        {state.lists.map((list) => (
          <List
            id={list.id}
            key={list.id}
            title={list.title}
            tasks={list.tasks}
            onClickAddTask={() => setIsOpenModal(true)}
            onClickTask={() => setIsOpenEditModal(true)}
            setSelectedList={setSelectedList}
            setSelectedTask={setSelectedTask}
            // onSubmitAddTask=()=>
          />
        ))}
        <AddButton handleAddList={handleAddList} />
        <AddTaskModal
          listId={selectedList}
          isOpen={isOpenModal}
          onClose={onCloseModal}
          onSubmit={onSubmitAddTask}
        />

        <ViewAndEditTaskModal
          task={selectedTask}
          listId={selectedList}
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
          onSubmit={onSubmitEditTask}
          onDelete={onDelteTask}
        />
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="w-[90vw] h-[80vh] rounded-xl p-8 bg-white shadow-lg mx-auto mt-16 ">
        <TodoList />
      </div>
    </>
  );
};

export default Home;
