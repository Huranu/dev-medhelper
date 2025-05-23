import React from 'react'
import { googleLogin } from '../../_lib/auth'
import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc"

const GoogleLoginButton = () => {
    return (
        <Button
            type='button'
            className="py-6 flex items-center gap-4 rounded-full"
            variant="outline"
            onClick={googleLogin}
        >
            <FcGoogle size={20} />
            Гүүглээр нэвтрэх
        </Button>
    )
}

export default GoogleLoginButton