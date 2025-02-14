import React, { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

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

type AddListProps = {
  handleAddList: (title: string) => void;
};
const AddListButton: React.FC<AddListProps> = ({ handleAddList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");

  return (
    <div className="w-64 p-4">
      {!isAdding ? (
        <Button
          icon={<PlusOutlined />}
          block
          onClick={() => setIsAdding(true)}
          className="text-gray-600 hover:text-blue-500"
        >
          Add another list
        </Button>
      ) : (
        <div className="flex flex-col">
          <Input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list title"
            className="mb-2"
            autoFocus
          />

          <div className="flex mt-2 space-x-2">
            <Button
              disabled={listName === ""}
              color="default"
              variant="solid"
              onClick={() => {
                handleAddList(listName);
                setListName("");
              }}
              className="w-full "
            >
              Add List
            </Button>
            <Button
              type="text"
              onClick={() => setIsAdding(false)}
              //   className="w-full bg-gray-300 hover:bg-gray-400"
            >
              <CloseOutlined />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddListButton;
