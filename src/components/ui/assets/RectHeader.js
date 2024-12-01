
export default function Header({ label }) {
    return (
        <div className="flex flex-row justify-between bg-neutral-50 shadow-md border-custom p-7 rounded-lg m-5">
            <h1 className="text-4xl text-bold">{label}</h1>
        </div>
    );
}