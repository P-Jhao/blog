import Home from "@/views/Home";
import About from "@/views/About";
import Project from "@/views/Project";
import Blog from "@/views/Blog";
import Message from "@/views/Message";

export default [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/project", component: Project },
  { path: "/blog", component: Blog },
  { path: "/message", component: Message },
];
