"use client"
import bg from '@/public/bg.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import rugbyPlayer1 from '@/public/RugbyPlayer1.png'
import logo from '@/public/logo.png'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Input from '@/app/components/auth/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

type Varient  = 'LOGIN' | 'SIGNUP'

export default function Auth() {

  const [varient, setVarient] =  useState<Varient>('LOGIN')

  const session = useSession();
  const router = useRouter();
  useEffect(()=>{
    if(session?.status === 'authenticated'){
      router.push('/')
    }
  },[session?.status, router])
 

  const togglevarient = async () => {
    if (varient === 'LOGIN') {
      setVarient('SIGNUP');
    }else{
      setVarient('LOGIN')
    }
  }
  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm<FieldValues>({
    defaultValues:{
      email: '',
      password: '',
      username: '',
    }
  })

  const onSubmit:SubmitHandler<FieldValues> = (data) =>{
    
    
    if(varient === 'SIGNUP'){
      axios.post('/api/auth/registerAccount',  data)
      .catch((err)=> console.log("Something went wrong", err))
    }
    if(varient === 'LOGIN'){
      signIn('credlogin',{
        ...data,
        redirect: false
        })
        .then((callback)=> {
          if(callback?.error){
            console.log("Invalid Credentials")
          }
          if(callback?.ok && !callback?.error){
            console.log("Success")
          }
        })
    }
  }


  return (
   <main className="h-screen w-full flex justify-center items-center" 
   style={{
    backgroundImage: `url(${bg.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
    }}>
    <div className="bg-black bg-opacity-70  h-[450px] w-[700px] flex flex-col items-center gap-5 border-4 rounded-3xl relative overflow-hidden">
    <Image src={logo} alt='' className='absolute top-0 right-0 rounded-bl-3xl' height={100}/>
      <div className='text-white text-4xl font-bold mt-10'>{varient=== 'LOGIN'? "Log In": 'Sign Up'}</div>
      
      <div className='flex gap-20 h-full w-full relative justify-end'>
        <Image src={rugbyPlayer1} alt='' className='absolute bottom-0 left-8' height={350}/>


        <form 
        className='flex flex-col h-72 w-fit mr-20  justify-between'
        onSubmit={handleSubmit(onSubmit)}>

          <div className='flex flex-col gap-5 text-white'>
            <Input label="Email" id="email" type="text" register={register} errors={errors} />
            <Input label="Password" id="password" type="password" register={register} errors={errors} />
            { varient === 'SIGNUP' &&
            <Input label="Username" id="username" type="text" register={register} errors={errors} />}
          
          </div>

          <div className='w-full'>
            <button 
            type='submit' 
            className='bg-orange-500 py-2 rounded-full text-white font-bold w-full'
            >{varient=== 'LOGIN'? "Log In": 'Sign Up'}
            </button>

            {varient=== 'LOGIN'? 
              <div className='text-white text-sm'>
                <label>Don't have an account: </label>
                <span className='cursor-pointer font-bold' onClick={() => togglevarient()}>Sign Up</span>
              </div>:
              <div className='text-white text-sm'>
                <label> Already have an account: </label>
                <span className='cursor-pointer font-bold' onClick={() => togglevarient()}>Login</span>
              </div>}
          </div>
          
        </form>


      </div>
      
    </div>
   </main>
  )
}