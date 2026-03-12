import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import Surface from '../ui/Surface';
import { RiUserLine, RiLogoutBoxRLine, RiSettings4Line } from 'react-icons/ri';
import supabase from '~/services/supabase';

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const handleLogout = async () => {
        setIsOpen(false);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button 
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label={t('global.menu.label')}
                aria-controls="user-menu"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-ink/5 hover:bg-ink/10 border border-ink/5 transition-all active:scale-95 focus:outline-none"
            >
                <RiUserLine className="text-xl text-ink" />
            </button>

            {isOpen && (
                <Surface 
                    id="user-menu"
                    role="menu" 
                    className="absolute right-0 mt-2 w-56 border border-ink/5 py-2 z-50"
                >
                    <NavLink 
                        to="/profile"
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors
                            ${isActive 
                                ? "text-ink cursor-default" 
                                : "text-ink-muted hover:text-ink"
                            }
                        `}
                        onClick={() => setIsOpen(false)}
                    >
                        <RiSettings4Line className="text-lg" />
                        {t('global.menu.settings')}
                    </NavLink>

                    <div className="h-[1px] bg-ink/5 my-1" />

                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold cursor-pointer w-full text-left text-ink-muted hover:text-ink transition-colors"
                    >
                        <RiLogoutBoxRLine className="text-lg" />
                        {t('global.menu.logout')}
                    </button>
                </Surface>
            )}
        </div>
    );
}
