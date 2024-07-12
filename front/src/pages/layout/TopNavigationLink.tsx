import {Link, LinkProps, useMatch} from "react-router-dom";

type TopNavigationLinkProps = LinkProps & {
    tid?: string| undefined
};

const TopNavigationLink = function ({children, to, tid, ...props}: TopNavigationLinkProps) {
    const match = !!useMatch(to.toString());

    function className(elementClassName: string = 'top-navigation__link') {
        return match
            ? `${elementClassName} ${elementClassName}--current`
            : elementClassName;
    }

    return (
        <Link to={to}
              className={className()}
              data-tid={tid}
              {...props}>
            {children}
        </Link>
    );
}

export default TopNavigationLink;