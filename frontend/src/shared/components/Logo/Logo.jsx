import { cn } from "../../utils";
import { logoImg } from '../../assets';

export const Logo = ({ className }) => {
    return <img src={logoImg} alt="Forkit Logo" className={cn(className)} />
}