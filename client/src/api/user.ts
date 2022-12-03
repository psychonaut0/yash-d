import axios, { AxiosError } from "axios"
import { UserInterface } from "../interfaces/api"


export async function login(params: any) {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/user/login`,
      {
        ...params
      },
      {
        withCredentials: true
      })
    return data
  }
  catch (err: any) {

    return err.response.data
  }
}

export async function getUser() {
  try {
    const { data }: { data: UserInterface } = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/user/`, { withCredentials: true })
    return data
  }
  catch (err) {
    console.error(err)
    return null
  }
}