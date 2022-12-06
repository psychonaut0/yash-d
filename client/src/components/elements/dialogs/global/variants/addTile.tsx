import DialogLayout from "../layout";
import { BiX, BiRightArrowAlt } from "react-icons/bi";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addGroup } from "../../../../../api/groups";
import { GroupInterface, ImageInterface } from "../../../../../interfaces/api";
import { useAtom } from "jotai";
import { dialogType } from "../../../../../state";
import { addTile } from "../../../../../api/tiles";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { addImage, getImages } from "../../../../../api/images";


interface InputValues {
  title: string,
  description?: string,
  localUrl?: string,
  remoteUrl?: string,
  imageFile?: FileList,
  image?: string
}

export default function AddTileDialog() {

  const { register, handleSubmit, setValue, getValues } = useForm<InputValues>();

  const queryClient = useQueryClient()

  const [showDialog, setShowDialog] = useAtom(dialogType)

  const [selectedImage, setSelectedImage] = useState<number | undefined>()

  const images = useQuery({
    queryKey: ['images'],
    queryFn: getImages
  })

  function handleImageChange(i: number) {
    let image = images.data?.[i]._id

    setValue('image', image)
    if (selectedImage !== i) {
      setSelectedImage(i)
    }
    else {
      setSelectedImage(undefined)
    }
  }

  const mutationImage = useMutation({
    mutationFn: (data: File | null) => addImage(data),
    onMutate: async (newGroup) => {
      await queryClient.cancelQueries({ queryKey: ["images"] })
      const prevGroup = queryClient.getQueryData<Array<ImageInterface>>(["images"])
      queryClient.setQueryData(["images"], (old: any) => [...old, newGroup])
      return { prevGroup }
    },
    onError: (err, newGroup, context) => {
      console.error(err);
      queryClient.setQueryData(["images"], context?.prevGroup)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["images"] })
    }
  })

  const mutation = useMutation({
    mutationFn: (data: FieldValues) => addTile(data),
    onMutate: async (newGroup) => {
      await queryClient.cancelQueries({ queryKey: ["tiles"] })
      const prevGroup = queryClient.getQueryData<Array<GroupInterface>>(["tiles"])
      queryClient.setQueryData(["tiles"], (old: any) => [...old, newGroup ])
      return { prevGroup }
    },
    onError: (err, newGroup, context) => {
      console.error(err);
      queryClient.setQueryData(["tiles"], context?.prevGroup)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tiles"] })
    }
  })

  async function submit(formData: FieldValues) {
    let updatedForm = formData

    if (updatedForm.imageFile?.length === 1) {
      const imageData = await mutationImage.mutateAsync(updatedForm.imageFile.item(0));
      updatedForm.image = await imageData._id
    }
    await mutation.mutateAsync(updatedForm)

    setShowDialog({type: "none"})
  }


  return (
    <DialogLayout title="Add a new tile">
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
        <div className="w-full flex space-x-6 justify-center">
          <label className="w-full flex flex-col space-y-2">
            <p className="pl-2 text-xl">Local URL: </p>
            <div className="relative w-full flex flex-col justify-center items-center">
              <input {...register('localUrl')} className="peer ya-input" placeholder="e.g. http://localhost:1234 (optional)..." type={"url"} />
              <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
            </div>
          </label>
          <label className="w-full flex flex-col space-y-2">
            <p className="pl-2 text-xl">Remote URL: </p>
            <div className="relative w-full flex flex-col justify-center items-center">
              <input {...register('remoteUrl')} className="peer ya-input" placeholder="e.g. https://nextcloud.com (optional)..." type={"url"} />
              <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
            </div>
          </label>
        </div>
        <p className="pl-2 text-xl">Icon: </p>
        <Tabs onSelect={(index) => {
          setValue("imageFile", undefined)
          setSelectedImage(undefined)
          setValue("image", "")
        }}>
          <TabList className={"flex space-x-2"}>
            {images.data?.length !== 0 && <Tab disabledClassName="bg-dark-600 w-full">Media</Tab>}
            <Tab disabledClassName="bg-red-600 w-full">Upload</Tab>
          </TabList>
          {images.data?.length !== 0 &&
            <TabPanel>
              <div className="h-36 w-[600px] overflow-y-auto grid grid-cols-4 gap-6 px-4">
                {
                  images.data?.map((image, i) => {
                    return <div onClick={() => { handleImageChange(i) }} className={`transition-all ${selectedImage === i ? "border-primary border-2" : "border-light border-2"} cursor-pointer w-32 h-32 flex justify-center items-center p-1 border-primary border rounded-md`} key={i}>
                      <img className="object-contain " src={image.sourceUrl} />
                    </div>
                  })
                }
                <input defaultValue={""} {...register('image')} type={"hidden"} />
              </div>
            </TabPanel>
          }
          <TabPanel>
            <label className="w-[600px] h-36 flex flex-col space-y-2  justify-center items-center">
              <div className="relative w-full flex flex-col justify-center items-center">
                <input accept="image/*" {...register('imageFile')} className="peer ya-input cursor-pointer" placeholder="tile title..." type={"file"} />
                <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
              </div>
            </label>
          </TabPanel>
        </Tabs>
        <div className="w-full flex space-x-6 justify-end px-6 pt-4">
          <div onClick={() => { setShowDialog({ type: "none" }) }} className="cursor-pointer flex px-4 py-2 items-center border-primary-400 text-primary-400 border rounded-md"><BiX size={"2rem"} className="pr-2" />Cancel</div>
          <button type="submit" className=" disabled:opacity-50 disabled:cursor-not-allowed flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Add <BiRightArrowAlt size={"2rem"} className="pl-2" /></button>
        </div>
      </form>
    </DialogLayout>
  )
}
