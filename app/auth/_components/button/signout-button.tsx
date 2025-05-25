import { logout } from '@/app/auth/_lib/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const SignOutButton = ({ className }: { className?: string }) => {
    return (
        <Button onClick={logout} className={className}>
            Гарах
        </Button>
    )
}

export default SignOutButton