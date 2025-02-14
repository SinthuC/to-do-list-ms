import React, { useState } from "react";
import { Modal, Input, Button, Form, Typography } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

interface Task {
  id: string;
  title: string;
  desc: string;
}
// interface List {
//   id: string;
//   title: string;import { Typography } from 'antd';

//   tasks: Task[];
// }

interface ViewAndEditTaskModalProps {
  // type: "view" | "edit";
  listId: string | undefined;
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, desc: string) => void;

  //   onAddTask: (title: string, description: string) => void;
}

const ViewAndEditTaskModal: React.FC<ViewAndEditTaskModalProps> = ({
  task,
  listId = "",
  isOpen = false,
  onClose,
  onSubmit,
}) => {
  const { Title, Text } = Typography;
  const [type, setType] = useState<string>("view");
  const handleSubmit = async (values: {
    title: string;
    description: string;
  }) => {
    const { title, description } = values;
    onSubmit(title, description);
    onClose();
    form.resetFields();
    console.log("VAL FROM MODAL", values, listId);
  };

  const [form] = Form.useForm();
  return (
    <Modal
      open={isOpen}
      title="Task details"
      onCancel={() => onClose()}
      footer={null}
      className="max-w-lg mx-auto"
    >
      {type === "view" ? (
        <>
          <Title level={3}>Task title: {task.title}</Title>
          <Title level={4}>Task description: {task.desc}</Title>
        </>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ title: "", description: "" }}
        >
          <Form.Item
            label="Task Title"
            name="title"
            rules={[
              { required: true, message: "Please input the title of the task" },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter task description" rows={4} />
          </Form.Item>

          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => onClose()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700"
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Task
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ViewAndEditTaskModal;
