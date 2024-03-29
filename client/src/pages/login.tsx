import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiRightArrow, BiRightArrowAlt, BiX } from "react-icons/bi";
import { redirect, useNavigate } from "react-router-dom";
import { getUser, login } from "../api/user";
import { UserInterface } from "../interfaces/api";

interface InputValues {
  username: String,
  password: String
}

export default function Login() {

  const { register, handleSubmit } = useForm<InputValues>();
  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const queryClient = useQueryClient()

  const user = useQuery({
    queryFn: getUser,
    queryKey: ['user']
  })


  const mutation = useMutation({
    mutationFn: (data: InputValues) => login(data),
    onMutate: async (newGroup) => {
      setError(false)
      await queryClient.cancelQueries({ queryKey: ["user"] })
      const prevGroup = queryClient.getQueryData<UserInterface>(["user"])
      return { prevGroup }
    },
    onError: (err, newGroup, context) => {
      setError(true)
      queryClient.setQueryData(["user"], context?.prevGroup)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onSuccess(data, variables, context) {
      navigate('/')
    },
  })


  function submit(data: InputValues) {
    mutation.mutate(data)
  }

  useEffect(() => {
    if(user.data){
      navigate('/')
    }
  }, [user])
  
  

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-10">
      <h1 className="text-7xl font-bold text-primary-600">
        Login
      </h1>
      <form onSubmit={handleSubmit((data) => {submit(data) })} className="py-4 flex flex-col space-y-8 w-1/2 min-w-[300px]">
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Username: <span className="text-primary">*</span></p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input onFocus={() => {setError(false)}} required {...register('username')} className={`${error ? "border-2 border-red-500" : "border-0"} peer relative z-10 w-full py-2 px-2 bg-dark-600 rounded-md focus:border-0 focus:outline-none`} placeholder="Your cool username..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Password: <span className="text-primary">*</span></p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input onFocus={() => {setError(false)}} required {...register('password')} className={`${error ? "border-2 border-red-500" : "border-0"} peer relative z-10 w-full py-2 px-2  bg-dark-600 rounded-md focus:border-0 focus:outline-none`} placeholder="Your super secret password..." type={"password"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        {
          error ?
          <p className="text-red-500">Wrong username or password</p>
          :
          null
        }
        <div className="w-full flex space-x-6 justify-end px-6 pt-4">
          <button type="submit" className="flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Submit <BiRightArrowAlt size={"2rem"} className="pl-2" /></button>
        </div>
      </form>
    </div>
  )
}
