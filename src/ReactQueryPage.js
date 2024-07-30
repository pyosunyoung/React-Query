import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import React from 'react'
import { usePostQuery } from './hooks/usePosts';

const ReactQueryPage = () => {
  
  const {data, isLoading, isError, error, refetch} = usePostQuery()
  console.log("data", data, isLoading) //data값 isloading true, false값 추출해줌
  console.log("error", isError, error); // 바로 에러가 안뜨고 api 호출을 3번 더 하고 에러뜸, api 호출 재시도 횟수도 설정가능
  // 만약 stale time보다 gcTime이 짧으면 어떻게되나?
  // stale time주기엔 캐시 데이터를 들고오는데 gctime이 더 짧다면 캐시 데이터를 삭제할것 이문제 어떻게 해결?
  // 위처럼 1분간 stale time , gctime 5초일때 55초 동안 캐시 데이터가 없을 것
  // 캐시가 사라지면 stale타임도 사라져서 다시 데이터를 불러야함,
  // staleTime이 아무리 길어도 캐시가 없으면 다시 api를 부른다.
  // 그래서 stale < gctime이 공식이 유지되어야 함 그래야 api 호출 통제 가능
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError) {
    return <h1>{error.message}</h1>
  }
  
  return (
    <div>
      {data?.map(item => <div>{item.title}</div>)} 
      <button onClick={refetch}>post리스트 다시 들고오기</button> 
      </div>
  ) // refetch는 버튼 눌렀을 떄 api 들고옴, 맨처음 페이지 들어갔을 떄 api호출 x는 enabled:false 이거 설정 후 ㄱㄱ
}

export default ReactQueryPage