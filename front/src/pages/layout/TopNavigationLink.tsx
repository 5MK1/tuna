import {Link, LinkProps, useMatch} from "react-router-dom";

interface TopNavigationLinkProps extends LinkProps {
}

const TopNavigationLink = function ({children, to, ...props}: TopNavigationLinkProps) {
    const match = !!useMatch(to.toString());

    function className(elementClassName: string = 'top-navigation__link') {
        return match
            ? `${elementClassName} ${elementClassName}--current`
            : elementClassName;
    }

    return (
        <Link to={to}
              className={className()}
              {...props}>
            {children}
        </Link>
    );
}

export default TopNavigationLink;