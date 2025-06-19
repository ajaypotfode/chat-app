import { setFormErrors } from "@/redux/slice/globalSlice";


export const signUpFormValidate = (formData, dispatch) => {
    let newErrors = {};

    if (!formData.userName?.trim()) {
        newErrors.userName = "UserName is required";
    }

    if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
    }


    if (!formData.password?.trim()) {
        newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
        dispatch(setFormErrors(newErrors));
        return false;
    }

    dispatch(setFormErrors({}));
    return true;
};
