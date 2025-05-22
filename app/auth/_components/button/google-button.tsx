import React from 'react'
import { googleLogin } from '../../_lib/auth'
import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc"

const GoogleLoginButton = () => {
    return (
        <Button
            type='button'
            className="py-6 flex items-center gap-2"
            variant="outline"
            onClick={googleLogin}
        >
            Login with Google
            <FcGoogle size={20} />
        </Button>
    )
}

export default GoogleLoginButton