
import Navigation from '@/components/ui/navigation/Navigation';
import {DataProvider} from './data/dataContext.js';

export default function Layout({ children, }) {
    return (
        <DataProvider>
        <div className="flex flex-row h-screen md:overflow-hidden">
            <div className=" flex-none">
                <Navigation />
            </div>
            <div className="flex-grow md:overflow-y-auto">{children}</div>
        </div>
        </DataProvider>
    );
}