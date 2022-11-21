import axios from "axios"
import { GroupInterface } from "../interfaces/api"

export async function getGroups() {
  const { data } = await axios.get<GroupInterface[]>(`${import.meta.env.VITE_SERVER_URI}/api/groups`)
  return data
}
