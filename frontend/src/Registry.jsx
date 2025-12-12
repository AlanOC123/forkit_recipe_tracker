import { MainLayout } from "./features/main/layout/MainLayout";
import { LoginLayout } from "./features/auth/layout/Login/LoginLayout";
import { SignUpLayout } from "./features/auth/layout/SignUp/SignUpLayout";
import { DashboardLayout } from "./features/dashboard/layout/DashboardLayout";
import { SearchLayout } from "./features/searchRecipe/layout/SearchLayout";

export const Main = () => <MainLayout />;
export const Login = () => <LoginLayout />;
export const SignUp = () => <SignUpLayout />;
export const Dashboard = () => <DashboardLayout />;
export const Search = () => <SearchLayout />;
