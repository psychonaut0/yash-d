import axios, { AxiosError } from "axios"


export async function login(params: any) { 
  
  try{
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/user/login`,
    {
      ...params
    })
  
    console.log(data)
    return data
  }
  catch (err: any) {

    return err.response.data
  }
}