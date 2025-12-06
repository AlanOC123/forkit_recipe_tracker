import { useAuth } from "../../../../context/AuthContext";
import { Button } from "../../../../components/Button/Button";
import styles from './Header.module.css';

export function Header() {
    const { user, logoutUser } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>Forkit</h1>
            </div>

            <nav className={styles.nav}>
                {user ? (
                    <>
                        <span>Welcome, {user?.username}</span>
                        <Button
                            kind={"tertiary"}
                            variant="standard"
                            onClick={logoutUser}
                        >
                            Logout
                        </Button>
                        <Button
                            kind={"primary"}
                            variant="standard"
                            icon={"add"}
                        >
                            New Recipe
                        </Button>
                    </>
                ) : (
                    <>
                        <Button kind={"secondary"} href="/sign-up">
                            Sign Up
                        </Button>
                        <Button kind={"primary"} href="/login">
                            Login
                        </Button>
                    </>
                )}
            </nav>
        </header>
    );
}