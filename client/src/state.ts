import {atom} from "jotai"

type Dialogs = {
 type: "none" | "add-group" | "remove-group" | "add-tile",
 groupId?: string,
 tileId?: string
}

export const editMode = atom(false)

export const dialogType = atom<Dialogs>({type: "none"})
