import { toast } from "react-toastify"

const { createSlice, isPending, isFulfilled, isRejected } = require("@reduxjs/toolkit")

const initialState = {
    error: {},
    formErrors: {},
    loading: {},
    // sidebar: true
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setFormErrors: (state, action) => {
            state.formErrors = action.payload;
        },
        clearFormErrors: (state) => {
            state.formErrors = {};
        },
        // handleSidebar: (state, action) => {
        //     state.sidebar = !state.sidebar
        // }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                const key = action.type.replace("/pending", "")
                state.loading[key] = true,
                    delete state.error[key]
            })
            .addMatcher(isFulfilled, (state, action) => {
                const key = action.type.replace("/fulfilled", "")
                state.loading[key] = false,
                    delete state.error[key]

            })
            .addMatcher(isRejected, (state, action) => {
                const key = action.type.replace("/rejected", "")
                state.loading[key] = false,
                    state.error[key] = action.payload?.message

                toast.error(`${action.payload?.message}`)
            })

    }
})
export const { setFormErrors, clearFormErrors, handleSidebar } = globalSlice.actions

export default globalSlice.reducer