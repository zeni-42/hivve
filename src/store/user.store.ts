import { create } from "zustand"

interface userState {
    userId: string
    fullName: string,
    email: string,
    avatar: string,
    banner: string,
    clearUser: () => void
}

export const useUserStore = create<userState> ((set) => ({ 
    userId: typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : '',
    fullName: typeof window !== 'undefined' ? localStorage.getItem('fullName') || '' : '',
    email: typeof window !== 'undefined' ? localStorage.getItem('email') || '' : '',
    avatar: typeof window !== 'undefined' ? localStorage.getItem('avatar') || '' : '',
    banner: typeof window !== 'undefined' ? localStorage.getItem('banner') || '' : '',
    clearUser: () => {
        localStorage.removeItem('fullName')
        localStorage.removeItem('avatar')
        set({ fullName: '', avatar: '' })
    },
}))