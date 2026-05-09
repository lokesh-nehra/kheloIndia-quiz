import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut, User, LayoutDashboard, Settings } from 'lucide-react';


export default function UserProfile({ user, onGoHome }) {
    const [isOpen, setIsOpen] = useState(false);
console.log(user);

    return (
        <div className="fixed top-6 right-8 z-[100]">
            {/* User Avatar Circle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full border-2 border-[#e781fb] overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL || 'https://via.placeholder.com/150'}
                        alt="User profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-white font-bold text-sm">
                        {user.displayName
                            ?.split(' ')
                            .map(word => word.charAt(0))
                            .join('')
                            .toUpperCase() || 'U'}
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Transparent Backdrop to close menu when clicking outside */}
                    <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>

                    <div className="absolute right-0 mt-1 w-64 bg-white rounded-md shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex flex-col items-center border-bottom pb-3 mb-3 border-gray-100">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL || 'https://via.placeholder.com/150'}
                                    className="w-16 h-16 rounded-full mb-2 border border-gray-200 shadow-sm"
                                    alt=""
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full mb-3 bg-gradient-to-br from-blue-400 to-indigo-700 flex items-center justify-center shadow-md">
                                    <span className="text-white text-2xl font-black">
                                        {user.displayName
                                            ?.split(' ')
                                            .map(word => word.charAt(0))
                                            .join('')
                                            .toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                            <p className="font-bold text-gray-800 text-lg">{user.displayName}</p>
                            <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>

                        <button
                            onClick={() => {
                                onGoHome(); // Reset the quiz state
                                setIsOpen(false); // Close the menu
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-semibold cursor-pointer group mb-1"
                        >
                            <LayoutDashboard size={20} className="text-[#e781fb]" />
                            <span>Home</span>
                        </button>

                        <div className="h-[1px] bg-gray-200 my-2"></div>

                        <button
                            onClick={() => signOut(auth)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-100 rounded-lg transition-colors font-semibold cursor-pointer group"
                        >
                            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
