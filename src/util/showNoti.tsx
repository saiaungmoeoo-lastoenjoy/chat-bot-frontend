import { Box, DEFAULT_THEME, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { InfoCircle, Information, Ranking, Warning2 } from "iconsax-react";

type status = "success" | "error" | "info" | "warning" | "loading" | undefined;

// Usage
// onClick={() => showToastNoti("New Installation Successful", "success")}

const showNoti = (title: string, status: status = "info") => {
  const theme = DEFAULT_THEME;
  let toastColor = theme.colors.blue[5];
  let icon = InfoCircle;
  if (status === "success") {
    toastColor = theme.colors.teal[5];
    icon = Ranking;
  } else if (status === "error") {
    toastColor = theme.colors.red[7];
    icon = Warning2;
  } else if (status === "warning") {
    toastColor = theme.colors.orange[5];
    icon = Information;
  } else {
    toastColor = theme.colors.gray[7];
    icon = Information;
  }

  notifications.show({
    title: title,
    message: "",
    loading: status === "loading" ? true : false,
    icon: <Box component={icon} color="#fff" />,
    styles: {
      root: {
        padding: rem(14),
        background: toastColor,
        border: toastColor,
      },
      title: {
        fontSize: rem(14),
        textAlign: "center",
        color: theme.white,
        fontWeight: 700,
      },
      icon: {
        background: toastColor,
      },
      closeButton: {
        color: theme.white,
        "&:hover": {
          background: "transparent",
        },
      },
    },
    sx: { width: "auto" },
  });
};

export default showNoti;
