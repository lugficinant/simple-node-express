import { useRef } from 'react';

//
import {

    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {


    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');

    //ref
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 阻止页面刷新
        if (emailRef.current !== null) {

            const email = emailRef.current.value
            console.log('Email:', email);
        }
        if (passwordRef.current !== null) {

            const password = passwordRef.current?.value
            console.log('Password:', password);
        }
    }

    return (
        <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
            {/* 这里确保使用 form 标签并绑定 onSubmit */}
            <form id='formm' onSubmit={handleSubmit}>
                <Flex
                    flexDirection="column"
                    bg={formBackground}
                    p={12}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Heading mb={6}>Log In</Heading>


                    <Input
                        id='email'
                        ref={emailRef}
                        placeholder="johndoe@gmail.com"
                        type="email"
                        variant="filled"
                        mb={3}
                    />
                    <Input
                        id='password'
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
                            Enable Dark Mode?
                        </FormLabel>
                        <Switch
                            id="dark_mode"
                            colorScheme="teal"
                            size="lg"
                            onChange={toggleColorMode}
                        />
                    </FormControl>
                </Flex>
            </form>
        </Flex>
    );
};

export default Login;
