import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function AppShellLogin({ children }: Props) {
    return (
        <div className='flex min-h-screen flex-row'>
            <div className='flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8'>{children}</div>
            <div
                className='hidden w-4/12 items-center justify-center bg-cover bg-center md:flex'
                style={{ backgroundImage: "url('/assets/img/foret.jpg')" }}
            >
                <div className='text-center'>
                    <h2 className='mt-6 text-2xl font-bold text-gray-200'><a href="https://nxtransfert.com" target='_blank'>Découvrez NxTransfer</a></h2>
                    <p className='mt-2 text-gray-300'>Transférez vos fichiers rapidement et en toute sécurité 🚀</p>
                </div>
            </div>
        </div>
    );
}
