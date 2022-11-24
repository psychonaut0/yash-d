import axios from "axios"
import { ImageInterface } from "../interfaces/api"

export async function getImages() {
  const { data } = await axios.get<ImageInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/images`)
  return data
}

export async function addImage(params: any) {
  const formData = new FormData()

  formData.append("image", params)
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    }
  )
  console.log('AO',formData)
  return data
}