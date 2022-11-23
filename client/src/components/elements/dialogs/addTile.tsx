import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { FieldValues, useForm } from "react-hook-form";
import { BiRightArrowAlt, BiX } from "react-icons/bi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { getImages } from "../../../api/images";
import { dialogType } from "../../../state";
import DialogLayout from "./layout";


export default function AddTileDialog() {

  const { register, handleSubmit } = useForm();

  const [showDialog, setShowDialog] = useAtom(dialogType);

  const images = useQuery({
    queryKey: ['images'],
    queryFn: getImages
  })


  function submit(formData: FieldValues) {
    console.log(formData)
  }

  return (
    <DialogLayout title="Add a tile">
      <form onSubmit={handleSubmit((data) => submit(data))} className="py-4 flex flex-col space-y-4">
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Title: <span className="text-primary">*</span></p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input required {...register('title')} className="peer ya-input" placeholder="Tile title..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
        <label className="w-full flex flex-col space-y-2">
          <p className="pl-2 text-xl">Description: </p>
          <div className="relative w-full flex flex-col justify-center items-center">
            <input {...register('description')} className="peer ya-input" placeholder="Tile short description..." type={"text"} />
            <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
          </div>
        </label>
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
        <Tabs>
          <TabList>
            <Tab>Choose an icon:</Tab>
            <Tab>Upload</Tab>
          </TabList>
          <TabPanel className={"max-w-[600px]"}>
            <div className="h-36 w-full overflow-y-auto grid grid-cols-4 gap-6 px-4">
              {
                images.data?.map((image, i) => {
                  return <div className="cursor-pointer w-32 h-32 flex justify-center items-center p-1 border-primary border rounded-md" key={i}>
                    <img className="object-contain " src={image.sourceUrl} />
                  </div>
                })
              }
              {
                images.data?.map((image, i) => {
                  return <div className="cursor-pointer w-32 h-32 flex justify-center items-center p-1 border-primary border rounded-md" key={i}>
                    <img className="object-contain " src={image.sourceUrl} />
                  </div>
                })
              }
              {
                images.data?.map((image, i) => {
                  return <div className="cursor-pointer w-32 h-32 flex justify-center items-center p-1 border-primary border rounded-md" key={i}>
                    <img className="object-contain " src={image.sourceUrl} />
                  </div>
                })
              }
            </div>
          </TabPanel>
          <TabPanel >
          <label className="w-[600px] flex flex-col space-y-2 ">
              <div className="relative w-full flex flex-col justify-center items-center">
                <input {...register('image')} className="peer ya-input cursor-pointer" placeholder="Group title..." type={"file"} />
                <div className=" absolute transition-all duration-500 w-[0%]  peer-focus:w-[101%] peer-focus:h-[110%] bg-primary rounded-md" />
              </div>
            </label>
          </TabPanel>
        </Tabs>
        <div className="w-full flex space-x-6 justify-end px-6 pt-4">
          <div onClick={() => { setShowDialog({ type: "none" }) }} className="cursor-pointer flex px-4 py-2 items-center border-primary-400 text-primary-400 border rounded-md"><BiX size={"2rem"} className="pr-2" />Cancel</div>
          <button type="submit" className="flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Add <BiRightArrowAlt size={"2rem"} className="pl-2" /></button>
        </div>
      </form>
    </DialogLayout>
  )
}
