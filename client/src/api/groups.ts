import axios from "axios"
import { GroupInterface } from "../interfaces/api"

export async function getGroups() {
  const { data } = await axios.get<GroupInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/groups`)
  return data
}

export async function addGroup(params: any) {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/groups`,
    {
      ...params
    })
  console.log('okke')
  return data
}
