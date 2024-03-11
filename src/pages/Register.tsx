import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button, BackgroundImage, rem } from "@mantine/core";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import showNoti from "../util/showNoti";
import Image from "../assets/bg.jpg";

interface User {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUser(user);
      await axios.post(`${import.meta.env.VITE_URL}/api/user/register`, user).then(() => {
        showNoti("Success!", "success");
        navigate("/login");
        localStorage.setItem("user", JSON.stringify({ name: user.name }));
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUser(user);
        showNoti(error.message, "error");
      } else {
        setUser(user);
        showNoti("An unknown error occurred.", "error");
      }
    }
  };
  return (
    <Container
      size="xl"
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <BackgroundImage
        src={Image}
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          opacity: "0.8",
        }}
      >
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: rem(400),
            height: rem(480),
            transform: "translate(-50%,-50%)",
          }}
        >
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            CHAT BOT
          </Title>
          <Text size="sm" align="center" mt={5}>
            Already have an account?
            <Link to={"/login"}>
              <Anchor size="sm" component="button">
                Login In
              </Anchor>
            </Link>
          </Text>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            sx={{
              backgroundColor: "#ffffff95",
              backdropFilter: "blur(5px)",
              boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextInput label="Name" name="name" value={user.name} onChange={handleChange} placeholder="your name" required />
              <TextInput label="Email" name="email" value={user.email} onChange={handleChange} placeholder="you@gmail.com" mt="md" required />
              <PasswordInput label="Password" name="password" value={user.password} onChange={handleChange} placeholder="Your password" required mt="md" />
              <Button fullWidth mt="xl" type="submit">
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </BackgroundImage>
    </Container>
  );
};

export default Register;
