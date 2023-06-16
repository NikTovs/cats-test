import { State, Action, StateContext } from '@ngxs/store';
import { StoreImagesModel } from 'src/app/types/storeTypes';

export class SetImages {
    static readonly type = '[Images] SetImages';
    constructor(public payload: string[]) {}
}

@State<StoreImagesModel>({
    name: 'images',  
    defaults: {imagesUrl: []}  
  })
export class ImagesState {

    @Action(SetImages)
    setImages({setState}: StateContext<StoreImagesModel>, {payload}: SetImages) {
        setState(() => (
            {imagesUrl: payload}
        ));
    }

}