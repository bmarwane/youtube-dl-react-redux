import request from 'axios';

export function downloadVideoAction(videoId){
    return function(dispatch){
        dispatch({ type: 'BEGIN_DOWNLOAD' })

        return request.post('/download', {id: videoId})
            .then(function(res){
                dispatch({ type: 'END_DOWNLOAD'})
                window.location = '/getfile?id=' + res.data.id
            })
            .catch(function(response){
                dispatch({ type: 'ERROR_DOWNLOAD' })
            })
    }

}