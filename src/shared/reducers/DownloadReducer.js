import {Map} from 'immutable';

export default function(state = Map(), action){
    switch(action.type){
        case 'BEGIN_DOWNLOAD':
            return state.merge({
                isDownloading: true,
                isError: false
            })
        case 'ERROR_DOWNLOAD':
            return state.merge({
                isDownloading: false,
                isError: false
            });
        case 'END_DOWNLOAD':
            return state.merge({
                isDownloading: false,
                isError: false
            })
    }
    return state
}