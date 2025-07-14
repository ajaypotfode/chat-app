"use client"
import UseAuthData from '@/hooks/useAuthData'
import UseProfileData from '@/hooks/useProfileData'
import React, { useEffect } from 'react'
import { PageSpinner, SmallComponentSpinner } from './Loaders'
import Image from 'next/image'
// import ProfileImage from './ProfileImage'

const Profile = ({ handlechatForm, loading }) => {
    const { getUserLogout } = UseAuthData()

    const { bio,
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
    } = UseProfileData()



    return (
        <div className="add-chat-User_form fixed inset-0 flex items-center bg-black/50 p-4 z-30"
            onClick={() => {
                handlechatForm(null)
                // handleIsUpdate()
            }}
        >
            {/* <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center"> */}
            <div className="bg-[#2A2A2A] p-8 rounded-2xl w-full max-w-md shadow-lg flex flex-col justify-center items-center text-white" onClick={(e) => e.stopPropagation()}>
                {
                    loading['getProfileData'] ? <PageSpinner /> :
                        (
                            <>
                                <div className='w-full h-full place-content-center flex justify-center text-4xl font-bold relative '>
                                    {profileData.image && <ProfileImage
                                        imageRef={imageRef}
                                        handleImageUpdateClick={handleImageUpdateClick}
                                        handleImageUpload={handleImageUpload}
                                        image={image}
                                        loading={loading}
                                        profileImage={profileData.image}
                                        updateImage={changeProfilePicture}
                                    />}
                                </div>
                                <div className='profile-name mt-2 w-full'>
                                    {/* <p className='text-[#ff5c5c]  w-full'>Your Name</p> */}
                                    <p className='text-center text-3xl'>{profileData.userName}</p>
                                </div>
                                <div className=' mt-2 w-full'>
                                    <p className='text-[#ff5c5c]  w-full'>Your Bio</p>
                                    {
                                        !isUpdate ? <div className='w-full flex gap-2 '>
                                            <p className='flex-1'>{profileData.bio}</p>
                                            <button onClick={handleIsUpdate}><i className="bi bi-pencil"></i></button>
                                        </div> :
                                            <div className='w-full flex gap-2 '>
                                                <input
                                                    type="text"
                                                    onChange={handleNewBio}
                                                    value={bio}
                                                    className='border-0 border-b flex-1 outline-0 border-b-[#ff5c5c]'
                                                />
                                                <button className='text-2xl' onClick={getChangeBio}><i className="bi bi-check2"></i></button>
                                            </div>
                                    }
                                </div>

                                <div className='profile-logout-button mt-24 '>
                                    <button className='bg-[#ff5c5c] px-4 py-2 rounded-2xl' onClick={getUserLogout}>LogOut</button>
                                </div>
                            </>
                        )
                }
            </div>
            {/* </div> */}
        </div>
    )
}




const ProfileImage = ({ image, handleImageUpdateClick, updateImage, handleImageUpload, imageRef, loading, profileImage }) => {
    return (
        <>
            {image ? <>
                <div className='relative border border-red-700'>
                    <Image src={image} className="h-20 w-20 rounded-full border " width={120} height={120} quality={100} alt='/images/profile-image.png' />
                    {loading['uploadImage'] && <SmallComponentSpinner />}
                </div>
                <span className='absolute top-8 smallm:right-28 right-16  text-xl cursor-pointer' onClick={updateImage}>
                    <i className="bi bi-check2"></i>
                </span>
            </> :
                <>
                    <div className='relative'>
                        <Image src={profileImage} className="h-20 w-20 rounded-full border " width={100} height={100} quality={100} alt='ajay' />
                        {loading['uploadImage'] && <SmallComponentSpinner />}
                    </div>
                    <span className=' absolute top-8 smallm:right-28 right-16 text-lg cursor-pointer' onClick={handleImageUpdateClick}>
                        <i className="bi bi-pencil"></i>
                    </span>
                </>
            }

            <input type="file" className='border border-red-600 hidden' ref={imageRef} onChange={handleImageUpload} />
        </>
    )
}




export default Profile
