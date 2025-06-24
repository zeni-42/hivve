import { create } from "zustand"

interface userState {
    userId: string
    fullName: string,
    email: string,
    avatar: string,
    banner: string,
    setData: (userId: string, fullName: string, email: string, avatar: string, banner: string) => void,
    setAvatar: (av: string) => void,
    setBanner: (bn: string) => void,
    clearData: () => void,
    hydrate: () => void,
}

export const useUserStore = create<userState>((set) => ({
    userId: '',
    fullName: '',
    email: '',
    avatar: '',
    banner: '',
    setData: (userId, fullName, email, avatar, banner) => {
        set(() => ({
            userId,
            fullName,
            email,
            avatar,
            banner,
        }));
    },
    setAvatar: (av) => {
        set(() => ({
            avatar: av,
        }))
    },
    setBanner(bn) {
        set(() => ({
            banner:  bn,
        }))
    },
    clearData: () => {
        set(() => ({
            userId: '',
            fullName: '',
            email: '',
            avatar: '',
            banner: '',
        }))
    },
    hydrate: () => {
        set(() => ({
            userId: localStorage.getItem('userId') || '',
            fullName: localStorage.getItem('fullName') || '',
            email: localStorage.getItem('email') || '',
            avatar: localStorage.getItem('avatar') || '',
            banner: localStorage.getItem('banner') || '',
        }))
    }
})) 