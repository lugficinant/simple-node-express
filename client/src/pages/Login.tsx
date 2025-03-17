import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toServer } from "../services/api";

//
import {
  Text,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
//

//

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  //ref
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //nevigate
  const navigate = useNavigate();

  //login button logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止页面刷新
    console.log("clicked login");
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    console.log("your input 😎😎", "Email:", email, "Password:", password);
    console.log("lets check your input~~🤣");
    try {
      const response = await toServer.testPost(email, password); // 等待 Promise 完成
      if (response.success) {
        console.log("Login successful 😘, user ID:", response.message);
        navigate("/home");
      } else {
        alert("Invalid credentials 😒");
      }
    } catch (err) {
      console.error(" 😂 Login failed:", err);
    }
  };

  return (
    <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
      {/* 这里确保使用 form 标签并绑定 onSubmit */}
      <form id="formm" onSubmit={handleSubmit}>
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={6}>Log In</Heading>

          <Input
            id="email"
            ref={emailRef}
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
          />
          <Input
            id="password"
            ref={passwordRef}
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
          />
          <Button colorScheme="teal" mb={8} type="submit">
            Log In
          </Button>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mb="0">
              Dark Mode
            </FormLabel>
            <Switch
              id="dark_mode"
              colorScheme="teal"
              size="lg"
              onChange={toggleColorMode}
            />
          </FormControl>
        </Flex>
        <Text
          w="100%"
          textAlign="center"
          alignSelf="center"
          padding="5px"
          color="red.500"
        >
          plz input your email and password
        </Text>
      </form>
    </Flex>
  );
};

export default Login;
