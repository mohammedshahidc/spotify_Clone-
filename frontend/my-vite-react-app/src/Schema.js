import * as Yup from 'yup'

export const schema=Yup.object({
    name:Yup.string().min(2).required('name is required'),
    email:Yup.string().email().required('email is required'),
    password:Yup.string().min(8).required('password is required'),
    cpassword:Yup.string().oneOf([Yup.ref('password'),null],'password is not matching')
})