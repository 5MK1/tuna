import {ButtonHTMLAttributes} from "react";

type TunaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { tid?: string | undefined };

const TunaButton = function(props: TunaButtonProps) {
    const buttonAttributes = (({tid, ...x}) => x)(props);
    return <button className="tuna-button tuna-button--rebeccapurple"
                   data-tid={props.tid}
                   {...buttonAttributes}>{props.children}</button>
}
export default TunaButton;