import * as React from 'react';
import { useStoreState } from '@/state/hooks';
import { useInitials } from '@/hooks/use-initials';

// Wrapper de l'avatar
function Avatar({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-slot='avatar'
            className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

function AvatarImage({ className = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img data-slot='avatar-image' className={`aspect-square h-full w-full ${className}`} {...props} />;
}

function AvatarFallback({
    className = '',
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
    return (
        <div
            data-slot='avatar-fallback'
            className={`bg-neutral-700 text-white flex h-full w-full items-center justify-center rounded-full ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// --- Avatar utilisateur avec initiales ---
export const UserAvatar = () => {
    const user = useStoreState((state) => state.user.data);
    const getInitials = useInitials();

    const initials =
        user?.name_first && user?.name_last
            ? getInitials(`${user.name_first} ${user.name_last}`)
            : getInitials(user?.username || 'System User');

    return (
        <Avatar>
            {/* Si on avait une image : <AvatarImage src={user.avatarUrl} /> */}
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    );
};
export default Avatar;
export { AvatarImage, AvatarFallback };
