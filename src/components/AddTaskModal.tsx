import React from "react";
import { Modal, Input, Button, Form } from "antd";

interface AddTaskModalProps {
  listId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, desc: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen = false,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = async (values: {
    title: string;
    description: string;
  }) => {
    const { title, description } = values;
    onSubmit(title, description);
    onClose();
    form.resetFields();
  };

  const [form] = Form.useForm();
  return (
    <Modal
      open={isOpen}
      title="Add New Task"
      onCancel={() => onClose()}
      footer={null}
      className="max-w-lg mx-auto"
    >
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
    </Modal>
  );
};

export default AddTaskModal;
