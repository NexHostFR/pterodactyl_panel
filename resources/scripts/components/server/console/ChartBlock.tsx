import React, { ReactNode } from 'react';
// import styles from '@/components/server/console/style.module.css';

interface ChartBlockProps {
    title: string;
    legend?: ReactNode;
    children: ReactNode;
}

const ChartBlock: React.FC<ChartBlockProps> = ({ title, legend, children }) => {
    return (
        <section className='group bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
            <header className='flex items-center justify-between px-4 py-3 border-b border-gray-700'>
                <h3 className='font-mono text-lg text-gray-100 group-hover:text-blue-400 transition-colors'>{title}</h3>
                {legend && <div className='flex items-center text-sm text-gray-400 gap-2'>{legend}</div>}
            </header>
            <div className='p-4 bg-gray-900 rounded-b-lg'>{children}</div>
        </section>
    );
};

export default ChartBlock;
