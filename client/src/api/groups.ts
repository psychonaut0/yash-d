import axios from "axios"
import { GroupInterface } from "../interfaces/api"

export async function getGroups(params: any) {
  const { data } = await axios.get<GroupInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/groups`,
    {
      params: {
        ...params
      },
      withCredentials: true
    })
  return data
}

export async function getGroup(params: any, id: string) {
  try {
    const { data } = await axios.get<GroupInterface>(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}`,
      {
        params: {
          ...params
        },
        withCredentials: true
      },
    )
    return data
  }
  catch (e) {
    console.error('NOPE', e)
  }
}

export async function addGroup(params: any) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/groups`,
    {
      ...params
    },
    {
      withCredentials: true
    })
  return data
}

export async function addGroupTile(id: string, params: any) {
  const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}/tile`,
    {
      ...params
    },
    {
      withCredentials: true
    })


  return data
}

export async function removeGroup(id: string) {
  const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/groups/${id}`, { withCredentials: true })
  return data
}
