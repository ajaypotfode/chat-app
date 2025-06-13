"use client"
import { getLoginData, getSignupData, signInUser, signupUser } from "@/redux/slice/authSlice"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

const UseAuthData = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loginData, signUpData } = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.global)


    const handleSignupData = (e) => {
        const { value, name } = e.target
        dispatch(getSignupData({ ...signUpData, [name]: value }))
    }

    const handleLoginData = (e) => {
        const { value, name } = e.target
        dispatch(getLoginData({ ...loginData, [name]: value }))
    }

    const getUserSignUP = (e) => {
        e.preventDefault();
        dispatch(signupUser(signUpData))
    }

    const getUserLogin = async (e) => {
        e.preventDefault();
        const response = await dispatch(signInUser(loginData)).unwrap()
        if (response.ok) {
            router.push('/')
        }
    }

    const getUserLogout = async () => {
        //  e.preventDefault();
        await signOut({ redirect: false });
        router.push("/login")
    }

    return {
        handleLoginData,
        handleSignupData,
        getUserLogin,
        getUserLogout,
        getUserSignUP,
        loginData,
        signUpData,
        loading,
        error
    }
}

export default UseAuthData