import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import { UserAvatar } from './Avatar';

const RightNavigation = styled.div`
    & > a,
    & > button,
    & > .navigation-link {
        ${tw`flex items-center h-full no-underline px-6 cursor-pointer transition-all duration-150`};
        color: ${theme`colors.gray.300`};

        &:hover,
        &.active {
            color: ${theme`colors.cyan.400`};
            background-color: ${theme`colors.gray.800`};
            box-shadow: inset 0 -2px ${theme`colors.cyan.500`};
            border-radius: 0.375rem;
        }

        &:focus {
            outline: 2px solid ${theme`colors.cyan.500`};
            outline-offset: 2px;
        }
    }
`;

export default () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-ignore
            window.location = '/';
        });
    };

    return (
        <div className='w-full bg-gray-900 shadow-md overflow-x-auto'>
            <SpinnerOverlay visible={isLoggingOut} />
            <div className='mx-auto w-full flex items-center h-[3.5rem] max-w-[1200px]'>
                <div id='logo' className='flex-1'>
                    <Link
                        to='/'
                        className='text-2xl font-header px-4 no-underline text-gray-100 hover:text-cyan-400 transition-colors duration-150'
                    >
                        {name}
                    </Link>
                </div>
                <RightNavigation className='flex h-full items-center justify-center'>
                    <SearchContainer />
                    <Tooltip placement='bottom' content='Dashboard'>
                        <NavLink to='/' exact>
                            <FontAwesomeIcon icon={faLayerGroup} />
                        </NavLink>
                    </Tooltip>
                    {rootAdmin && (
                        <Tooltip placement='bottom' content='Admin'>
                            <a href='/admin' rel='noreferrer'>
                                <FontAwesomeIcon icon={faCogs} />
                            </a>
                        </Tooltip>
                    )}
                    <Tooltip placement='bottom' content='Account Settings'>
                        <NavLink to='/account'>
                            <span className='flex items-center justify-center w-6 h-6'>
                                <UserAvatar />
                            </span>
                        </NavLink>
                    </Tooltip>
                    <Tooltip placement='bottom' content='Sign Out'>
                        <button onClick={onTriggerLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </Tooltip>
                </RightNavigation>
            </div>
        </div>
    );
};
