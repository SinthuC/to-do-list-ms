import { useEffect } from "react";

import type { FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router";
import { logIn } from "../redux/signUpSlice";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

type FieldType = {
  email?: string;
  password?: string;
};

const { Title, Text } = Typography;

const Login: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser, users } = useSelector(
    (state: RootState) => state.signUp
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(logIn(values));
    const { email, password } = values;
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);
  return (
    <div className="flex items-center justify-center h-screen  ">
      <div className="w-full md:min-w-md max-w-lg py-14 px-8 bg-white rounded-xl shadow-md">
        <Title>Sign in</Title>
        <Form
          name="login-form"
          layout={"vertical"}
          size={"large"}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
              Sign in
            </Button>
          </Form.Item>
          <Text>
            {" "}
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </Form>
      </div>
    </div>
  );
};

export default Login;
