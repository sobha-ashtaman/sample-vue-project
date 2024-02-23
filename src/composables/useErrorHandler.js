import { useRouter } from "vue-router";

const useErrorHandler = ()=>{
    const router = useRouter();
    const throwError = (error)=>{
        const status = error.response.status;
        if(status == 404)
            router.push({name: 'notfound'})
    }

    return { throwError };
}

export default useErrorHandler;