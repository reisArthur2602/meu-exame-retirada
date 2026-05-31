import AppHeader from '@/components/app-header';
import { PropsWithChildren } from 'react';

const AppLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex-1 bg-slate-100 flex flex-col">
            <AppHeader active="upload" />
            {children}
        </div>
    );
};

export default AppLayout;
