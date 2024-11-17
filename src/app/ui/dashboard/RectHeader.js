
export default function Header({ children }) {
    return (
        <div className="flex flex-row w-full justify-between bg-gray-300 p-7 rounded-lg">
            {children}
        </div>
    );
}