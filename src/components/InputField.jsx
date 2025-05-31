const InputField = ({ value, onChangeValue, id, label, ...props }) => {
    return (
        <div className="relative w-full">
            <input
                {...props}
                id={`input-${label}`}
                placeholder=" "
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                className={`
                peer
                w-full
                bg-transparent
                text-white
                placeholder-transparent
                px-3
                pt-3
                pb-3.5
                rounded-md
                border
                border-gray-500
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition
                duration-200
                outline-none
                `}
            />
            <label
                htmlFor={`input-${label}`}
                className={`
                    absolute
                    left-2
                    ${value ? 'top-[-10px] text-sm text-blue-400' : 'top-3.5 text-base text-gray-100'}
                    px-2
                    bg-[#1e293b]
                    transition-all
                    duration-200
                    peer-placeholder-shown:top-3.5
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-500
                    peer-focus:top-[-10px]
                    peer-focus:text-sm
                    peer-focus:text-blue-400
                `}
            >
                Ingresar {label}
            </label>
        </div>
    )
}


export default InputField