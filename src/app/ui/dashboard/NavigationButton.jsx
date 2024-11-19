import Link from 'next/link';
import clsx from "clsx";

const getButtonClasses = (isActive) => clsx(
    'flex h-14 w-14 transition-shadow transition-transform duration-300 items-center hover:scale-105 border-2 border-violet-200 active:scale-100 justify-center rounded-lg bg-white shadow hover:shadow-lg hover:shadow-violet-500 active:shadow-violet-500 active:shadow-md cursor-pointer  ',
    {
        'border-2 border-violet-700 shadow-violet-500 shadow-md': isActive,
    }
);

const imageClass = "w-8 h-auto "

const textClass = "text-2xl font-bold text-black"

export default function LinkButtonImage({ href, icon, isActive, label}) {

    const buttonClasses = getButtonClasses(isActive);

    console.log(buttonClasses)
    return (
            <Link
                href={href}
                className={buttonClasses}
            >
                <img src={icon} alt={label} className={imageClass}/>
            </Link>
    )
}

export function LinkButtonText({href, text, isActive}) {
    const buttonClasses = getButtonClasses(isActive);

    return (
        <Link
            href={href}
            className={buttonClasses}
        >
            <div className={textClass}>
                {text}
            </div>
        </Link>
    )
}

export function ButtonImage({icon, onClick, isActive, label}){
    const buttonClasses= getButtonClasses(isActive);

    return (
        <div
            className={buttonClasses}
            onClick={onClick}
        >
            <img src={icon} alt={label} className={imageClass}/>
        </div>
    )
}