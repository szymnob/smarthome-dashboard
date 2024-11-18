
export default function Header({ children }) {
    return (
        <div className="flex flex-row justify-between bg-neutral-50 shadow-md border-2 border-neutral-300 p-7 rounded-lg m-5">
            {children}
        </div>
    );
}