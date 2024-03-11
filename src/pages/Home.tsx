import { Container } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chat from "../components/Chat";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <Navbar
        user={{
          image: "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjI0IiAgaGVpZ2h0PSIyNCIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9ImN1cnJlbnRDb2xvciIgIHN0cm9rZS13aWR0aD0iMiIgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgIHN0cm9rZS1saW5lam9pbj0icm91bmQiICBjbGFzcz0iaWNvbiBpY29uLXRhYmxlciBpY29ucy10YWJsZXItb3V0bGluZSBpY29uLXRhYmxlci11c2VyLWNpcmNsZSI+PHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDEybS05IDBhOSA5IDAgMSAwIDE4IDBhOSA5IDAgMSAwIC0xOCAwIiAvPjxwYXRoIGQ9Ik0xMiAxMG0tMyAwYTMgMyAwIDEgMCA2IDBhMyAzIDAgMSAwIC02IDAiIC8+PHBhdGggZD0iTTYuMTY4IDE4Ljg0OWE0IDQgMCAwIDEgMy44MzIgLTIuODQ5aDRhNCA0IDAgMCAxIDMuODM0IDIuODU1IiAvPjwvc3ZnPg==",
        }}
        tabs={["HELLO", "World", "JavaScript"]}
      />
      <Chat />
      <Footer />
    </Container>
  );
};

export default Home;
