import type { FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/signUpSlice";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

const { Title } = Typography;

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(signUp(values));
    toast.success("Sign up successful");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen  ">
      <div className="w-full md:min-w-md max-w-md py-14 px-8 bg-white rounded-xl shadow-md">
        <Title>Sign up</Title>
        <Form
          name="login-form"
          layout={"vertical"}
          size={"large"}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password" },
              {
                pattern: passwordPattern,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character (@, #, $, %, etc.) and must be between 8 and 64 characters.",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              variant="solid"
              className="my-4"
              color="cyan"
              block
              htmlType="submit"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
