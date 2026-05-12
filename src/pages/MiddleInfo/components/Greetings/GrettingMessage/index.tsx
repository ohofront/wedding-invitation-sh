import middleInfoImage from '@/assets/images/middleInfoImage.png';

const GreetingMessage = () => {
  return (
    <>
      <div className='text-xl font-medium'>소중한 분들을 초대합니다</div>

      <div className='m-10 leading-8'>
        매일의 작은 소란을 유쾌히
        <br />
        함께할 수 있는 평생의 짝꿍을 만났습니다.
        <br />
        저희 두 사람이 하나 되는 날,
        <br />
        곁에서 지켜봐 주신 소중한 분들을 초대합니다.
        <br />
      </div>

      {/* Content 이미지 */}
      <div className='pt-4'>
        <img src={middleInfoImage} className='w-full'></img>
      </div>
    </>
  );
};

export default GreetingMessage;
