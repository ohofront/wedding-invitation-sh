import { PhoneCall } from 'lucide-react';

const handleCall = () => {
  window.location.href = 'tel:02-2183-0230';
};

const DotItem = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className='flex gap-2'>
        {/* 점 크기를 text-[10px]로 줄이고 수직 정렬 유지 */}
        <span className='w-4 text-center text-[10px] leading-8 text-[#4a4a4a]'>●</span>
        <div className='flex-1 text-[15px] leading-8 text-[#4a4a4a]'>{children}</div>
      </div>
  );
};

const DashItem = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className='flex pl-2'>
        <span className='w-4 text-[18px] leading-8 text-[#4a4a4a]'>-</span>
        <div className='flex-1 text-[15px] leading-8 text-[#4a4a4a]'>{children}</div>
      </div>
  );
};

const WayToCome = () => {
  return (
      <div className='px-8 text-left'>
        <div className='py-2'>
          <div className='mb-1 text-[17px] text-[#4a4a4a]'>지하철</div>

          <DashItem>
            <span className='font-semibold'>선릉역 4번 출구(도보1분)</span> 를 나와,
            <br />
            IBK기업은행을 지나 50M 직진 맥도날드 옆 한신인터밸리24 빌딩, 4층
          </DashItem>
        </div>

        <div className='py-2'>
          <div className='mb-1 text-[17px] text-[#4a4a4a]'>버스</div>

          <DashItem>
            <div>한국자산신탁, 르네상스호텔, 서울상록회관 정류장 기준</div>

            <div className='pl-6 mt-1'>
              <DotItem>
                간선버스 <span className='text-blue-500'>N13, N61, 146, 341, 360, 740</span>
              </DotItem>

              <DotItem>
                광역버스 <span className='text-red-500'>1100, 1700, 2000, 2000-1, 7007, 8001, 9303</span>
              </DotItem>

              <DotItem>선릉역 방향 이동 두꺼비 빌딩 지나 30M 직진 한신인터밸리24 빌딩, 4층</DotItem>
            </div>
          </DashItem>

          <DashItem>
            <div>선릉역 1번, 10번 출구 정류장 기준</div>

            <div className='pl-6 mt-1'>
              <DotItem>
                간선버스 <span className='text-blue-500'>N13, N61, 146, 333, 341, 360, 740</span>
              </DotItem>

              <DotItem>
                광역버스 <span className='text-red-500'>1100, 1700, 2000, 7007, 8001, 9303, 9414</span>
              </DotItem>

              <DotItem>공항버스 6000</DotItem>

              <DotItem>
                선릉역 1번, 10번 출구 앞 정류장 하차 후 역삼역 방향으로 이동, 선릉역 4번 출구에서 100M 직진 시 좌측
                한신인터밸리24 빌딩, 4층
              </DotItem>
            </div>
          </DashItem>
        </div>

        <div className='py-2'>
          <div className='mb-1 text-[17px] text-[#4a4a4a]'>자가용</div>

          <DashItem>아펠가모 선릉</DashItem>

          <DashItem>도로명 : 서울 강남구 테헤란로 322 한신인터밸리24 빌딩 4층</DashItem>

          <DashItem>지번 : 서울 강남구 역삼동 707-24</DashItem>

          <DashItem>
            <button
                type='button'
                onClick={handleCall}
                className='flex items-center gap-1 text-blue-500 transition-transform active:scale-95'
            >
              02-2183-0230
              <PhoneCall size={18} color='#00A8FF' />
            </button>
          </DashItem>
        </div>

        <div className='py-2'>
          <div className='mb-1 text-[17px] text-[#4a4a4a]'>주차</div>

          <DashItem>1시간 30분 무료 &#40;추가 10분당 1,000원&#41;</DashItem>
        </div>
      </div>
  );
};

export default WayToCome;