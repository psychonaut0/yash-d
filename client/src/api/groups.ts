import axios from "axios"
import { GroupInterface } from "../interfaces/api"

export async function getGroups(params: any) {
  const { data } = await axios.get<GroupInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/groups`,
  {
    params: {
      ...params
    }
  })
  return data
}

export async function getGroup(params: any, id: string) {
  const { data } = await axios.get<GroupInterface>(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}`,
  {
    params: {
      ...params
    }
  })
  return data
}

export async function addGroup(params: any) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/groups`,
    {
      ...params
    })
  return data
}

export async function addGroupTile(id: string, params: any) {
  const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}/tile`,
  {
    ...params
  })

  console.log('sangue della madonna', data)

  return data
}

export async function removeGroup(id: string) {
  const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}`)
  return data
}
