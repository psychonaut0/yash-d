import axios from "axios"
import { GroupInterface } from "../interfaces/api"

export async function getGroups() {
  const { data } = await axios.get<GroupInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/groups`)
  return data
}

export async function addGroup(params: any) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/groups`,
    {
      ...params
    })
  return data
}

export async function removeGroup(id: string) {
  const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}`)
  return data
}
