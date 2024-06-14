type PicRadioGroupItem = {
    path: string,
    value: string,
    text?: string | undefined
}

type ValueChangedFn = (value: string) => void;

type PicRadioGroupProps = {
    items: PicRadioGroupItem[],
    value?: string | undefined,
    onChange?: ValueChangedFn | undefined
};

const PicRadioGroup = function (props: PicRadioGroupProps) {

    function getButtonCssClass(item: PicRadioGroupItem) {
        return item.value === props.value
            ? "pic-radio-group__item pic-radio-group__item--selected"
            : "pic-radio-group__item"
    }

    function onButtonClick(item: PicRadioGroupItem) {
        if (props.onChange !== undefined) {
            props.onChange(item.value);
        }
    }

    return (
        <div className="pic-radio-group">
            {props.items.map(item => (
                <button key={`display_${item.value}`}
                        className={getButtonCssClass(item)}
                        onClick={() => {
                            onButtonClick(item)
                        }}>
                    <img src={item.path} alt={item.value}/>
                    <label htmlFor={`radio_${item.value}`}
                           className="pic-radio-group__item-label">{item.text ?? item.value}</label>
                </button>
            ))}
        </div>
    );
}

export default PicRadioGroup;
