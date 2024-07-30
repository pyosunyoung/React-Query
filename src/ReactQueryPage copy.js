import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import React from 'react'

const ReactQueryPage = () => {
    const fetchPost = (queryData) => {
      const id = queryData.queryKey[1];
      console.log("qqq", queryData); 
        return axios.get(`http://localhost:3004/${id}`)
    }
    // useQuery는 컴포넌트 들어가자 마자 실행함
    
  const { isLoading,data, isError, error, refetch} = useQuery({ // 매개변수 원래 3개 들어가는데 최신버전 v5는 한개만 객체로 들가면 됨, data 추출
    queryKey:['posts', 1], // api 호출의 이름을 지정해주는것, 각각의 호출이 유니크한 이름이어야함
   // querykey는 유동적으로 바꿔줘야함, 홈페이지 url이 달라지니까
    queryFn: fetchPost, // 호출하고 싶은 api 적어줌
    retry : 1,
    // staleTime:60000,// 한번 가지고 오면 끝인 데이터 api는 staleTime을 지정해주먼 좋다.
    //fresh한 상태에서는 데이터 api안들고오니까 캐시에서 데이터를 가져온다. 1분동안은 api호출 x 1분 지나야 유통기한 끝남
    select:(data) => {
        return data.data; // data.data하는건 불편하고 data를 뽑아오면 쓸데없는 것들이 같이 나옴 그래서 select로 뽑아올 데이터 지정ㅇ함
    },
    // gcTime: 5000 // 5초뒤 캐시 데이터를 비워보자, 캐시 데이터를 주기적으로 비워주는게 좋다, 너무 오래된 데이터나, 안쓰는 캐시는 지워줘야함
    // gcTime 기본값은 5분이다.
    // refetchInterval : 3000 // api를 3초마다 부르겠다
    // refetchOnMount: false, // 컴포넌트가 시작이 될때 fetch를 api를 호출 할것인가? (페이지 바뀔 때, 기본값 true)
    // refetchOnWindowFocus : true, //  window에 focus 즉 윈도우 창에 포커스되면 api호출한다., 매번 유저에게 새로운 데이터를 보여주고 싶을 때 
    // enabled:false, // 맨처음 페이지 들어갔을 떄 api호출 안되게 설정, 기본값은 true
    // enabled:keyword , true false뿐만 아니라 안에 여러 값으로 설정해줄 수도 있다.
  });// inactive이 캐시 데이터를 안쓰는 상태(다른 페이지에 가있음), state현재 캐시 데이터를 사용중인 상태(현재페이지에 있음)
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
      {/* {data?.map(item => <div>{item.title}</div>)}  */}
      <button onClick={refetch}>post리스트 다시 들고오기</button> 
      </div>
  ) // refetch는 버튼 눌렀을 떄 api 들고옴, 맨처음 페이지 들어갔을 떄 api호출 x는 enabled:false 이거 설정 후 ㄱㄱ
}

export default ReactQueryPage