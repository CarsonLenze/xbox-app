import { useForm } from "react-hook-form";
import { useCallback } from 'react';
import axios from "axios";

export default function login() {
    const { register, handleSubmit, control, formState: { errors }, setError } = useForm();

    const email = register('email', {
        required: "Please enter a valid email",
    });

    const password = register('password', {
        required: "Please enter a valid password",
    });

    const onSubmit = useCallback(async (data) => {
        console.log(data)
        // setLoading(true);
        // const res = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     body: data
        // });
        // console.log(res)

        const response = await axios.post('/api/auth/login', data)
            .then(res => res.data)
            .catch(err => err.response.data);

        console.log(response)

        // if (response.error) {
        //     setLoading(false);
        //     setError(response.type, { type: response.type, message: response.message });
        // }
        // if (response.success) router.push({ pathname: '/' });
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...email} type="text" id="email" name="email" />
                <input {...password} type="password" id="password" name="password" />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}