import {
    faSearch,
    faUser,
    faSignOutAlt,
    faPlus,
    faClose,
    faBars,
    faTrashCan,
    faEdit,
    faGear,
    faCodeFork,
    faPlay,
    faFire,
    faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../utils";

export const Icon = ({ icon, className, size = '1em', ...props }) => {
    return (
        <FontAwesomeIcon
            style={{ width: size, height: size, fontSize: size, padding: 0 }}
            className={cn("inline-block text-center align-middle shrink-0", className)}
            icon={icon}
            {...props}
        />
    );
};

const Search = (props) => <Icon icon={faSearch} {...props} />;
const User = (props) => <Icon icon={faUser} {...props} />;
const Logout = (props) => <Icon icon={faSignOutAlt} {...props} />;
const Add = (props) => <Icon icon={faPlus} {...props} />;
const Close = (props) => <Icon icon={faClose} {...props} />;
const Menu = (props) => <Icon icon={faBars} {...props} />;
const Delete = (props) => <Icon icon={faTrashCan} {...props} />;
const Edit = (props) => <Icon icon={faEdit} {...props} />;
const Settings = (props) => <Icon icon={faGear} {...props} />;
const Fork = (props) => <Icon icon={faCodeFork} {...props} />;
const Play = (props) => <Icon icon={faPlay} {...props} />;
const Popular = (props) => <Icon icon={faFire} {...props} />;
const MoreOptions = (props) => <Icon icon={faEllipsisV} {...props}/>

Icon.Search = Search;
Icon.User = User;
Icon.Logout = Logout;
Icon.Add = Add;
Icon.Close = Close;
Icon.Menu = Menu;
Icon.Delete = Delete;
Icon.Edit = Edit;
Icon.Settings = Settings;
Icon.Fork = Fork;
Icon.Play = Play;
Icon.Popular = Popular;
Icon.MoreOptions = MoreOptions;