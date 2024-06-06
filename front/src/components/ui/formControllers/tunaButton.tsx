import {ButtonHTMLAttributes} from "react";

const TunaButton = function(x: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className="tuna-button tuna-button--rebeccapurple"
                   {...x}>{x.children}</button>
}
export default TunaButton;