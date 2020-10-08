import axios from 'axios'

const instance=axios.create({
    baseURL:'https://burger-app-6da8b.firebaseio.com/',

})

export default instance