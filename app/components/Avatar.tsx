'use client'
import Image from 'next/image';
import React from 'react'

const Avatar = () => {
  return (
    <Image className='
    rounded-full
    '
     src='/images/avatar.png'
     height={30}
     width={30}
     alt='Avatar'
    />
  )
}

export default Avatar
