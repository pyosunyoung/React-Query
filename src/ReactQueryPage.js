import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import React from 'react'

const ReactQueryPage = () => {
    const fetchPost = () => {
        return axios.get('http://localhost:3004/posts')
    }
    // useQuery는 컴포넌트 들어가자 마자 실행함
    
  const { isLoading,data, isError, error} = useQuery({ // 매개변수 원래 3개 들어가는데 최신버전 v5는 한개만 객체로 들가면 됨, data 추출
    queryKey:['posts'], // api 호출의 이름을 지정해주는것, 각각의 호출이 유니크한 이름이어야함
    queryFn: fetchPost, // 호출하고 싶은 api 적어줌
    retry : 1,
    select:(data) => {
        return data.data; // data.data하는건 불편하고 data를 뽑아오면 쓸데없는 것들이 같이 나옴 그래서 select로 뽑아올 데이터 지정ㅇ함
    },
    gcTime: 5000 // 5초뒤 캐시 데이터를 비워보자, 캐시 데이터를 주기적으로 비워주는게 좋다, 너무 오래된 데이터나, 안쓰는 캐시는 지워줘야함
    // gcTime 기본값은 5분이다.
});// inactive이 캐시 데이터를 안쓰는 상태(다른 페이지에 가있음), state현재 캐시 데이터를 사용중인 상태(현재페이지에 있음)
  console.log("data", data, isLoading) //data값 isloading true, false값 추출해줌
  console.log("error", isError, error); // 바로 에러가 안뜨고 api 호출을 3번 더 하고 에러뜸, api 호출 재시도 횟수도 설정가능
  
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError) {
    return <h1>{error.message}</h1>
  }
  
  return (
    <div>{data.map(item => <div>{item.title}</div>)}</div>
  )
}

export default ReactQueryPage