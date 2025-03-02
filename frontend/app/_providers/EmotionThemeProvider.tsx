import { CacheProvider, Theme, ThemeProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import createCache from '@emotion/cache';


interface Props {
  children: React.ReactNode;
}

const theme: Partial<Theme> = {};
const cache = createCache({
  key: 'css',
  prepend: true,
});


const EmotionThemeProvider: React.FC<Props> = function (props) {
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {props.children}
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default EmotionThemeProvider;