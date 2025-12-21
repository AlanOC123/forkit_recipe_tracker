import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ScrollToAnchor = () => {
    const { hash, pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ''));

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
            }

            const timer = setTimeout(() => {
                navigate(pathname, { replace: true })
            }, 1000);

            return () => clearTimeout(timer);
        }

    }, [hash, pathname, navigate])

    return null;
}

export default ScrollToAnchor;