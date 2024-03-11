import { Text, rem } from "@mantine/core";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100vw",
      }}
    >
      <Text
        sx={{
          padding: rem(32),
          textAlign: "center",
          fontSize: rem(14),
          color: "#555",
        }}
      >
        Created By Sai Aung Moe Oo
      </Text>
    </footer>
  );
};

export default Footer;
