import axios from 'axios';
export default function ({ $axios, store }, inject) {

    // Add configuration
    const baseUrl = 'http://127.0.0.1:8000/api/'
    inject('axioss', ( url,data) => {
         axios.get(baseUrl + url, {
            headers: {
                Authorization: `${$nuxt.$auth.getToken('local')}`,
            },
        }).then(res=>{
            data = res.data
        })
        // console.log($nuxt.$auth.getToken);
    })

}