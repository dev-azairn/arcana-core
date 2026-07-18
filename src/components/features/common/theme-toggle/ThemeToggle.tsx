import {
  Check,
  Laptop,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      icon: Laptop,
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />

          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownTrigger>

      <DropdownContent align="end">
        {themes.map(({ value, label, icon: Icon }) => (
          <DropdownItem
            key={value}
            onClick={() => setTheme(value)}
          >
            <Icon className="mr-2 h-4 w-4" />

            {label}

            {theme === value && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}