"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme();

    return (
        <div className={cn("flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border", className)}>
            <button
                onClick={() => setTheme("light")}
                className={cn(
                    "p-2 rounded-md transition-all",
                    theme === "light"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
                title="Light Mode"
            >
                <Sun size={16} />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={cn(
                    "p-2 rounded-md transition-all",
                    theme === "dark"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
                title="Dark Mode"
            >
                <Moon size={16} />
            </button>
        </div>
    );
}
