import { changeBio, getNewBio, getProfile, setIsUpdate } from '@/redux/slice/profileSlice'
import { useDispatch, useSelector } from 'react-redux'

const UseProfileData = () => {
    const dispatch = useDispatch()
    const { bio, isUpdate, profileData } = useSelector(state => state.profile)

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

    return {
        bio,
        isUpdate,
        profileData,
        handleNewBio,
        handleIsUpdate,
        getProfileData,
        getChangeBio
    }
}

export default UseProfileData