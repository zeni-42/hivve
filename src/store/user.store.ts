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
        const userId = localStorage.getItem(`hivve_user_credentials`) 
        const userData = localStorage.getItem(`hive_user_${userId}`);
        if (userData) {
            try {
                const parsedData = JSON.parse(userData)
                set(() => ({
                    userId: parsedData.id,
                    fullName: parsedData.fullName,
                    email: parsedData.email,
                    avatar: parsedData.avatar,
                    banner: parsedData.banner,
                }))
            } catch (error) {
                
            }
        }
    }
})) 