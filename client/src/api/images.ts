import axios from "axios"
import { ImageInterface } from "../interfaces/api"

export async function getImages() {
  const { data } = await axios.get<ImageInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/images`)
  return data
}