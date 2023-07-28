
import React, { ReactNode, useContext } from 'react';
import SelectedContext from '../utils/selectedContext';
import IconSideNav from './IconSideNav';
import EventsList from './EventsList';
import Calendar from './Calendar';

type LayoutProps = {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const { selected, setSelected } = useContext(SelectedContext);
    return (
        <div className='flex h-full'>

            <IconSideNav />
            <main className='ml-16 pl-6 w-full flex-1 p-4 bg-grey-700 h-screen'>

                {selected === 0 &&
                    <EventsList />
                }

                {selected === 1 &&
                <Calendar />
                }

                {children}
            </main>
        </div>
    )
}

export default Layout;