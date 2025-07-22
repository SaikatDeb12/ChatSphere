interface PropType {
    name?: string;
    label?: string;
    placeholder: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBox: React.FC<PropType> = ({
    name,
    label,
    placeholder,
    type,
    onChange,
}) => {
    return (
        <div>
            {label && <label className="font-semibold">{label}</label>}
            <input
                name={name}
                className="w-full transition delay-50 my-1 rounded-lg border-2 border-gray-200 hover:border-black focus:border-blue-400 px-2 py-1 outline-none"
                placeholder={placeholder}
                type={type}
                onChange={onChange}
            />
        </div>
    );
};

export default InputBox;
