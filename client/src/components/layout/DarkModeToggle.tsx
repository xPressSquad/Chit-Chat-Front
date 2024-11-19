import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from '@/context/ThemeProvider'

export function DarkModeToggle() {
    const { theme, setTheme } = useTheme()

    const hnadelSetTheme = (theme: any) => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => hnadelSetTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}