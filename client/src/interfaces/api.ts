
  interface ApiModelInterface {
    _id: string,
    __v: number,
  }
  
  export interface ImageInterface extends ApiModelInterface {
    createdAt: string,
    updatedAt: string,
    filename: string,
    sourceUrl: string,
    relativeUrl: string,
  }

  export interface TileInterface extends ApiModelInterface {
    title: string,
    description?: string,
    localUrl?: string,
    remoteUrl?: string,
    showTile: string,
    image: ImageInterface
  }

  export interface GroupInterface extends ApiModelInterface {
    title: string,
    description?: string,
    tiles?: [TileInterface]
  }