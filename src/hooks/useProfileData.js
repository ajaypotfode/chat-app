import { changeBio, getNewBio, getProfile, setIsUpdate, updateProfilePicture, uploadImage } from '@/redux/slice/profileSlice'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UseProfileData = () => {
    const dispatch = useDispatch()
    const { bio, isUpdate, profileData, image } = useSelector(state => state.profile)
    // const { loading } = useSelector((state) => state.global)
    const imageRef = useRef(null)

    
    const handleNewBio = (e) => {
        dispatch(getNewBio(e.target.value))
    }

    const handleIsUpdate = (e) => {
        e.preventDefault()
        dispatch(setIsUpdate(profileData.bio))
    }

    const getProfileData = () => {
        dispatch(getProfile())
    }

    const getChangeBio = (e) => {
        e.preventDefault()
        dispatch(changeBio(bio))
    }

    const handleImageUpdateClick = () => {
        imageRef.current?.click()
    }

    const handleImageUpload = (e) => {
        dispatch(uploadImage(e.target.files[0]))
    }

    const changeProfilePicture = async (e) => {
        e.preventDefault()
        const response = await dispatch(updateProfilePicture(image)).unwrap()
        if (response.success) {
            imageRef.current.value = ""
        }
    }

    return {
        bio,
        isUpdate,
        profileData,
        handleNewBio,
        handleIsUpdate,
        getProfileData,
        getChangeBio,
        imageRef,
        handleImageUpdateClick,
        handleImageUpload,
        image,
        changeProfilePicture
        // loading
    }
}

export default UseProfileData