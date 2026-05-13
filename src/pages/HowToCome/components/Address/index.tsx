const Address = () => {
  return (
      // 전체 요소들을 가운데로 정렬하기 위해 flex flex-col items-center 추가
      <div className='pb-5 flex flex-col items-center'>
        <div className='mb-5 text-xl'>오시는 길</div>

        <div className='my-2 leading-8 flex flex-col items-center'>
          <div className='mb-2 text-[18px]'>아펠가모 선릉 4층</div>

          {/* 주소 덩어리: 텍스트 줄맞춤을 위해 text-left 추가 */}
          <div className='flex flex-col gap-1 text-[15px] text-gray-600 tracking-tight break-keep text-left'>
            <div className='flex'>
              <span className='w-[50px] shrink-0 font-medium'>도로명</span>
              <span>서울 강남구 테헤란로 322 한신인터밸리24 빌딩 4층</span>
            </div>

            <div className='flex'>
              <span className='w-[50px] shrink-0 font-medium'>지번</span>
              <span>서울 강남구 역삼동 707-24</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Address;