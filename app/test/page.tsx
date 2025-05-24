import React from 'react'
import { auth } from '../auth';

const Page = async () => {
     const session = await auth();
     console.log(session)
  return (
    <div>Welcome {session?.user?.email}</div>
  )
}

export default Page