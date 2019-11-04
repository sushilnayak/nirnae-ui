import React, {Fragment} from 'react'
import {Link} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faHistory} from "@fortawesome/free-solid-svg-icons/faHistory";
import {faTasks} from "@fortawesome/free-solid-svg-icons/faTasks";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";

const activeLink = ({isPartiallyCurrent, isCurrent, href}) => {
    if (href === "/" && isCurrent === false) isPartiallyCurrent = false;
    return isPartiallyCurrent ? {className: "active"} : null;
};

export default function AppHeader() {
    return <div className={"app-header"}>
        <div className={"navigation-left"}>
        </div>
        <div className={"navigation-right"}>
            <ul>
                <li>
                    <Link to={"/"} getProps={activeLink}>
                        <FontAwesomeIcon size="sm" icon={faHome}/>
                        <span>Home</span>
                    </Link>
                </li>
                <li><Link to={"/editor"} getProps={activeLink}>
                    <FontAwesomeIcon size="sm" icon={faEdit}/>
                    <span>Editor</span>
                </Link></li>
                <li><Link to={"/executions"} getProps={activeLink}>
                    <FontAwesomeIcon size="sm" icon={faHistory}/>
                    <span>Executions</span>
                </Link></li>
                <li><Link to={"/reports"} getProps={activeLink}>
                    <FontAwesomeIcon size="sm" icon={faTasks}/>
                    <span>Reports</span>
                </Link></li>
                <li>
                    <Link to={"/settings"} getProps={activeLink}>
                        <FontAwesomeIcon icon={faCog}/>
                    </Link>
                </li>
            </ul>
        </div>
    </div>;
}
