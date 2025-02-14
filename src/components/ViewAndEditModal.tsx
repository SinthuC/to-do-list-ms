import React, { useState } from "react";
import { Modal, Input, Button, Form, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
  onDelete: () => void;

  //   onAddTask: (title: string, description: string) => void;
}

const ViewAndEditTaskModal: React.FC<ViewAndEditTaskModalProps> = ({
  task,
  isOpen = false,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const { Title } = Typography;
  const [type, setType] = useState<string>("view");
  const handleSubmit = async (values: {
    title: string;
    description: string;
  }) => {
    const { title, description } = values;
    onSubmit(title, description);
    handleAfterClosed();
  };

  const handleAfterClosed = () => {
    setType("view");
    onClose();
    form.resetFields();
  };

  const handleDelete = () => {
    onDelete();
    handleAfterClosed();
  };
  const [form] = Form.useForm();
  return (
    <Modal
      open={isOpen}
      title="Task details"
      onCancel={() => {
        handleAfterClosed();
      }}
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
              onClick={() => setType("view")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700"
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save
            </Button>
          </div>
        </Form>
      )}

      {type === "view" && (
        <div className="flex flex-col space-y-2">
          <Button
            block
            icon={<EditOutlined />}
            onClick={() => {
              form.setFieldsValue({
                title: task.title,
                description: task.desc,
              });
              setType("edit");
            }}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit
          </Button>

          <Button
            block
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete()
            }}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Delete
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ViewAndEditTaskModal;
