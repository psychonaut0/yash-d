import DialogLayout from "./layout";
import { BiX, BiRightArrowAlt } from "react-icons/bi";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroup } from "../../../api/groups";
import { GroupInterface } from "../../../interfaces/api";

type Props = {
  setter: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddGroupDialog({ setter }: Props) {

  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient()


  const mutation = useMutation({
    mutationFn: (data: FieldValues) => addGroup(data),
    onMutate: async (newGroup) => {
      await queryClient.cancelQueries({ queryKey: ["groups"] })
      const prevGroup = queryClient.getQueryData<Array<GroupInterface>>(["groups"])
      queryClient.setQueryData(["groups"], (old: any) => [...old, newGroup ])
      return { prevGroup }
    },
    onError: (err, newGroup, context) => {
      console.log(err);
      queryClient.setQueryData(["groups"], context?.prevGroup)
    },
    onSettled: (data) => {
      console.log('ole', data)
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    }
  })

  function submit(formData: FieldValues) {
    mutation.mutate(formData)
    setter(false)
  }


  return (
    <DialogLayout title="Add a new group">
      <form onSubmit={handleSubmit((data) => submit(data))} className="py-4 flex flex-col space-y-4">
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Title: <span className="text-primary">*</span></p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input required {...register('title')} className="peer relative z-10 w-full py-2 px-2 border-0 bg-dark-600 rounded-md focus:border-0 focus:outline-none" placeholder="Group title..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Description:</p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input {...register('description')} className="peer relative z-10 w-full py-2 px-2 border-0 bg-dark-600 rounded-md focus:border-0 focus:outline-none" placeholder="Group short description..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        <div className="w-full flex space-x-6 justify-end px-6 pt-4">
          <div onClick={() => { setter(false) }} className="cursor-pointer flex px-4 py-2 items-center border-primary-400 text-primary-400 border rounded-md"><BiX size={"2rem"} className="pr-2" />Cancel</div>
          <button type="submit" className="flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Add <BiRightArrowAlt size={"2rem"} className="pl-2" /></button>
        </div>
      </form>
    </DialogLayout>
  )
}
