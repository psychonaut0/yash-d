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

export async function logout() {
  try {
    const { data }: { data: any } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/user/logout`,
      {},
      { withCredentials: true }
    )
    return null
  }
  catch (err) {
    return false
  }
}

export async function getUser() {
  try {
    const { data }: { data: UserInterface } = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/user/`, { withCredentials: true })
    return data
  }
  catch (err) {
    console.clear()
    return false
  }
}