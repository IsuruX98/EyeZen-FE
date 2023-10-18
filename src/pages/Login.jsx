import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import hero from "../assets/main/home.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "../apis/axios";
import Loader from "../components/Loader";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const onFinish = async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", {
        email: values.email,
        password: values.password,
      });
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      if (res.data.isAdmin === true) {
        navigate("/admin");
      }
      if (res.data.isAdmin === false) {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      const res = err.response.status === 401;
      if (res) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Email or Password",
        });
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
      <div className="flex justify-center items-center h-full">
        <div>
          <span className="text-[46px] font-extrabold text-[#004AAD]">
            Login
          </span>
          <h2 className="pt-8 font-semibold">
            Unlock a World of Visual Wellness
          </h2>

          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <div className="mt-4">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="email"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </Form.Item>
            </div>

            <div className="mt-2">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </Form.Item>
            </div>
            <div className="mt-2">
              <Form.Item>
                <button
                  type="submit"
                  className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800"
                >
                  Login
                </button>
              </Form.Item>
            </div>
            <div>
              <Link to="/register" className="text-[#004AAD] hover:underline">
                Not a member ? Register
              </Link>
            </div>
          </Form>

          {loading && <Loader />}
        </div>
      </div>

      <div>
        <img
          className="rounded-3xl lg:h-[635px] h-full w-full object-cover"
          src={hero}
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
