import { Logo } from "../assets/logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b flex items-center justify-center">
      <div className="flex max-w-7xl w-full items-center justify-between">
        <a href="https://zuudeui.com">
          <Logo className="size-9 rounded-sm" />
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
