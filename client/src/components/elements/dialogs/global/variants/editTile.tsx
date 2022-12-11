import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { FieldValues, useForm } from "react-hook-form";
import { BiRightArrowAlt, BiX } from "react-icons/bi";
import { editTile } from "../../../../../api/tiles";
import { TileInterface } from "../../../../../interfaces/api";
import { dialogType } from "../../../../../state";
import DialogLayout from "../layout";

export default function EditTile({ id }: { id: string }) {

  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient()

  const [showDialog, setShowDialog] = useAtom(dialogType)

  const mutation = useMutation({
    mutationFn: (data: FieldValues) => editTile(data[0], data[1]),
    onMutate: async (mutationData: FieldValues) => {
      console.log('zan zan', mutationData[0])
      queryClient.cancelQueries({ queryKey: ["tiles"] })
      const prevTile = queryClient.getQueryData<Array<TileInterface>>(["tiles"])
      if (prevTile) {
        let newTile = prevTile
        newTile[prevTile?.map(e => e._id).indexOf(id)] = {
          ...newTile[prevTile?.map(e => e._id).indexOf(id)],
          title: mutationData[0].title,
          description: mutationData[0].description
        }
        queryClient.setQueryData(["tiles"], newTile)
      }
      return { prevTile }
    },
    onError: (err, newTile, context) => {
      console.error(err);
      queryClient.setQueryData(["tiles"], context?.prevTile)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tiles"] })
    }
  })

  function submit(formData: FieldValues) {
    mutation.mutate([formData, id])
    setShowDialog({ type: "none" })
  }

  return (
    <DialogLayout title="Edit tile">
      <form onSubmit={handleSubmit((data) => submit(data))} className="py-4 flex flex-col space-y-4">
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Title: <span className="text-primary">*</span></p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input required {...register('title')} className="peer relative z-10 w-full py-2 px-2 border-0 bg-dark-600 rounded-md focus:border-0 focus:outline-none" placeholder="Tile title..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Description:</p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input {...register('description')} className="peer relative z-10 w-full py-2 px-2 border-0 bg-dark-600 rounded-md focus:border-0 focus:outline-none" placeholder="Tile short description..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        <div className="w-full flex space-x-6 justify-end px-6 pt-4">
          <div onClick={() => { setShowDialog({ type: "none" }) }} className="cursor-pointer flex px-4 py-2 items-center border-primary-400 text-primary-400 border rounded-md"><BiX size={"2rem"} className="pr-2" />Cancel</div>
          <button type="submit" className="flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Add <BiRightArrowAlt size={"2rem"} className="pl-2" /></button>
        </div>
      </form>
    </DialogLayout>
  )
}
