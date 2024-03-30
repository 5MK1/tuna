export type StructIconType = 'triangleRight' | 'triangleDown' | 'circle';

export type StructIconProps = {
    type: StructIconType,
    filled: boolean
}

export default function StructIcon(props: StructIconProps) {
    const fill = props.filled ? '#4D5CBA60' : 'none';
    const content = ((type) => {
            switch (type) {
                case 'triangleRight':
                    return <polygon points="1 1 8 4.5 1 8" />;
                case 'triangleDown':
                    return <polygon points="4.5 8 8 1 1 1" />;
                case 'circle':
                    return <circle cx="4.5" cy="4.5" r="3.5" />;
            }
        }
    )(props.type);

    return (<>
            <svg width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g stroke-width="1"
                   fill={fill}
                   fill-rule="evenodd"
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   stroke="#4D5CBA">{content}</g>
            </svg>
        </>
    );
}