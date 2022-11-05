import { Theme } from "react-select"
import { Theme as DarkTheme } from '../ThemeProvider';

export const getTheme = (theme: DarkTheme | null, selectTheme: Theme) => {
    return { 
        ...selectTheme,
        colors: { 
            ...selectTheme.colors, 
            neutral0: theme?.mode === 'dark' ? '#212121' : selectTheme.colors.neutral0, // bg
            primary25: theme?.mode === 'dark' ? '#323232' : selectTheme.colors.primary25, // hover
            neutral20: theme?.mode === 'dark' ? '#000000' : selectTheme.colors.neutral20, // border
            neutral80: theme?.mode === 'dark' ? '#ffffff' : "black", // text
        } 
    }
}