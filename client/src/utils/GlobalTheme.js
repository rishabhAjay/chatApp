const GlobalTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: "#3c88fa",
          }
        : {
            main: "#a4cbfc",
          }),
    },
    ...(mode === "dark" && {
      background: {
        default: "#151233",
        paper: "#151233",
      },
    }),
    secondary: {
      ...(mode === "dark"
        ? {
            main: "#4d4d4f",
          }
        : {
            main: "#d9d9d9",
          }),
    },
    tertiary: {
      ...(mode === "dark"
        ? {
            main: "#181829",
          }
        : {
            main: "#ffffff",
          }),
    },
    pseudo: {
      main: "rgba(215, 215, 217, 0.3)",
    },
    text: {
      ...(mode === "light"
        ? {
            primary: "#212121",
            secondary: "#212121",
          }
        : {
            primary: "#ffffff",
            secondary: "#ffffff",
          }),
    },
  },
});

export default GlobalTheme;
