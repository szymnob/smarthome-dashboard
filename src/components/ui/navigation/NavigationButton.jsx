import Link from 'next/link';
import clsx from "clsx";
import * as PropTypes from "prop-types";
import { Tooltip } from 'react-tooltip'

const getButtonClasses = (isActive) => clsx(
    'flex h-14 w-14 transition-shadow transition-transform duration-300 items-center hover:scale-105 border-custom active:scale-100 justify-center rounded-lg bg-white shadow hover:shadow-lg hover:shadow-violet-500 active:shadow-violet-500 active:shadow-md cursor-pointer  ',
    {
        'border-2 border-violet-700 shadow-violet-500 shadow-md': isActive,
    }
);

const imageClass = "w-8 h-auto "

const textClass = "text-2xl font-bold text-black"

export default function LinkButtonImage({ href, icon, isActive, label}) {
    const buttonClasses = getButtonClasses(isActive);
    const id = `link-button-image-${label.toLowerCase().replace(' ', '-')}`;

    return (
        <>
            <Link
                href={href}
                className={buttonClasses}
                id={id}
            >
                <img src={icon} alt={label} className={imageClass}/>
            </Link>
            <Tooltip anchorSelect={`#${id}`} content={label} delayShow={500} place="right" />
        </>
    )
}

LinkButtonImage.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    label: PropTypes.string,
}

export function LinkButtonText({href, text, isActive}) {
    const buttonClasses = getButtonClasses(isActive);
    const id = `link-button-text-${text.toLowerCase().replace(' ', '-')}`;

    return (
        <>
        <Link
            href={href}
            className={buttonClasses}
            id={id}
        >
            <div className={textClass}>
                {text}
            </div>
        </Link>
        <Tooltip anchorSelect={`#${id}`} content={text} delayShow={500} place="right" />
        </>
    )
}

LinkButtonText.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
}

export function ButtonImage({icon, onClick, isActive, label}){
    const buttonClasses= getButtonClasses(isActive);
    const id = `button-image-${label.toLowerCase().replace(' ', '-')}`;

    return (
        <>
        <div
            className={buttonClasses}
            onClick={onClick}
            id={id}
        >
            <img src={icon} alt={label} className={imageClass}/>
        </div>
        <Tooltip anchorSelect={`#${id}`} content={label} delayShow={500} place="right" />
        </>
    )
}

ButtonImage.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    label: PropTypes.string,
}