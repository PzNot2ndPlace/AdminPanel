import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    huge404: React.CSSProperties;
    huge: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    huge404?: React.CSSProperties;
    huge?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    huge404: true;
    huge: true;
  }
}

const roboto = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontVariantNumeric: "lining-nums",
};

let theme = createTheme({
  palette: {
    background: {
      default: "#EFEFEF",
    },
  },
  typography: {
    fontFamily: "Roboto",
    button: {
      ...roboto,
      fontSize: 16,
      "@media (max-width:375px)": {
        fontSize: 14,
      },
    },
    h1: {
      ...roboto,
      fontSize: 40,
    },
    h2: {
      ...roboto,
      fontSize: 32,
    },
    h3: {
      ...roboto,
      fontSize: 20,
    },
    h4: {
      ...roboto,
      fontSize: 16,
    },
    body1: {
      ...roboto,
      fontSize: 16,
    },
    body2: {
      ...roboto,
      fontSize: 14,
    },
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none", 
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
  factor: 2,
});

theme.typography.h1.fontSize = 40;
theme.typography.h2.fontSize = 32;
theme.typography.h3.fontSize = 20;
theme.typography.h4.fontSize = 16;
theme.typography.body1.fontSize = 16;
theme.typography.body2.fontSize = 14;

theme.typography["huge"] = {
  ...roboto,
  fontSize: "120px",
  lineHeight: 1,
  color: "#375FFF",
  [theme.breakpoints.up("sm")]: {
    fontSize: "240px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "380px",
  },
};

theme.typography.h1["@media (max-width:375px)"] = {
  fontSize: 26,
};
theme.typography.h2["@media (max-width:375px)"] = {
  fontSize: 20,
};
theme.typography.h3["@media (max-width:375px)"] = {
  fontSize: 16,
};
theme.typography.h4["@media (max-width:375px)"] = {
  fontSize: 14,
};
theme.typography.body1["@media (max-width:375px)"] = {
  fontSize: 14,
};
theme.typography.body2["@media (max-width:375px)"] = {
  fontSize: 12,
};
theme.typography.button["@media (max-width:375px)"] = {
  fontSize: 14,
};

export default theme;
