import { Button, Container, Text, TextInput, createStyles, rem } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";
import showNoti from "../util/showNoti";
import axios from "axios";

const useStyles = createStyles(() => ({
  container: {
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: rem(8),
  },
  chatbody: {
    overflow: "scroll",
    width: "100%",
    height: rem(400),
    border: "1px solid #ccc",
    borderRadius: rem(5),
    color: "#000",
    paddingLeft: rem(8),
    lineHeight: rem(16),
  },
  form: {
    display: "flex",
    width: "100%",
    gap: rem(4),
  },
  input: { width: "100%" },
}));

const Chat = () => {
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState<string[]>([]);

  const { classes } = useStyles();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showNoti("Please wait", "loading");
    try {
      setText(text);
      setMessageList((list) => [...list, text]);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/message`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.meta.success) {
        setText("");
        setMessageList((list) => [...list, res.data.body.text]);
      } else {
        showNoti(res.data.meta.message, "error");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showNoti(error.message, "error");
      } else {
        showNoti("An unknown error occurred.", "error");
      }
    }
  };

  return (
    <Container className={classes.container} mt={16}>
      <Text className={classes.chatbody}>
        {messageList.map((list, i) => (
          <Text key={i}>{list}</Text>
        ))}
      </Text>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextInput className={classes.input} name="text" value={text} onChange={handleChange} placeholder="Ask anything" required />
        <Button type="submit">Ask</Button>
      </form>
    </Container>
  );
};

export default Chat;
