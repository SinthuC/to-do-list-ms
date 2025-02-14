import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-cyan-500 p-4 z-50">
      <div className="flex items-center justify-between max-w-8xl mx-auto">
        <div className="text-white text-xl ">To-do list Management system</div>

        <div className="text-white text-lg font-bold">
          <Button color="default" icon={<LogoutOutlined />}>
            Log out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
