import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Calendar } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
interface HeaderProps {
  user: any;
  logout: any;
}

export default function Header({ user, logout }: HeaderProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/60 backdrop-blur-md shadow-md"
          : "bg-background/80"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          <Calendar className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            EventFlow
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "About"].map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-foreground/80 hover:text-foreground transition-colors relative"
              whileHover={{ scale: 1.1 }}
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 hover:w-full" />
            </motion.a>
          ))}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profilePic || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button
                size="sm"
                className="px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-all"
              >
                Login
              </Button>
            </Link>
          )}
        </nav>
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetTitle className="text-lg font-semibold">
                Navigation
              </SheetTitle>
              <nav className="flex flex-col space-y-6 mt-6">
                {["Home", "About", "Events", "Contact"].map((item, index) => (
                  <motion.a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item}
                  </motion.a>
                ))}

                {user ? (
                  <Button
                    size="sm"
                    onClick={logout}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/signin">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
