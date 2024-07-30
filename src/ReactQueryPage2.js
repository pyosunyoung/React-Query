import { useQueries } from '@tanstack/react-query'

import axios from 'axios'
import React from 'react'

const ReactQueryPage2 = () => {
    const ids = [1, 2, 3, 4]

    const fetchPostDetail=(id) => {
        return axios.get(`http://localhost:3004/posts/${id}`)
    }
    const results = useQueries({ // 여러개의 쿼리를 부르겠다
        queries:ids.map((id) => {
            return {
                queryKey:["posts", id],
                queryFn: () => fetchPostDetail(id)
            }
        }),
        combine:(results) => {
            return {
               data: results.map((result) => result.data.data), // 데이터 값만 추출
            };
        }
    });
    console.log("rrr", results)
  return (
    <div></div>
  )
}

export default ReactQueryPage2