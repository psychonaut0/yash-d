import axios from "axios"
import { TileInterface } from "../interfaces/api"


export async function getTiles() {
  const { data } = await axios.get<TileInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/tiles`)
  return data
}

export async function addTile(params: any) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/tiles`,
    {
      ...params
    })

  return data
}

export async function editTile(params: any, id: string) {
  const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/tiles/${id}`,
    {
      ...params
    }

  )

  return data
}


export async function removeTile(id: string) {
  const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/tiles/${id}`)
  return data
}
