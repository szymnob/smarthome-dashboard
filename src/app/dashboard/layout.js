import Navigation from '@/app/ui/dashboard/Navigation';

export default function Layout({ children, }) {
    return (
        <div className="flex flex-row h-screen md:overflow-hidden">
            <div className=" flex-none">
                <Navigation />
            </div>
            <div className="flex-grow md:overflow-y-auto p-4">{children}</div>
        </div>
    );
}