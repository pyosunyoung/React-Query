import { useQuery } from '@tanstack/react-query'
import axios from "axios";

const fetchPost = () => { // 이 괄호에 query.js에서 받은 매개변수 값을 받아서 해당 데이터만 지정하여 가져올 수도 있음
    // const id = queryData.queryKey[1];
    // console.log("qqq", queryData); 
      return axios.get(`http://localhost:3004/posts`)
  }
 
export const usePostQuery = () => {
    return useQuery({
        queryKey:['posts'], 
        queryFn: () => fetchPost(), 
        retry : 1,
        select:(data) => {
            return data.data; 
        },
        
      });
}

// 이렇게 커스텀 훅 만들어 놓으면 어느 파일에서든 
//const {data, isLoading, isError, error, refetch} = usePostQuery() 이런식으로
//설정해주면 api 어느 파일에서든 호출 가능하다.
  
