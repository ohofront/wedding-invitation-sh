import { Button } from '@/components/ui/button';
import KakaoIcon from '@/assets/icons/kakao.svg';
import useKakaoSDK from '@/hooks/useKakaoSDK';

const INVITATION_URL = 'https://wedding-invitation-sh.vercel.app';
const THUMBNAIL_URL = `${INVITATION_URL}/images/wedding-share.png`;

const KakaoShareButton = () => {
  useKakaoSDK();

  const shareKakao = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 아직 로드되지 않았습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      alert('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }

    if (!window.Kakao.Share) {
      alert('카카오 링크 기능이 초기화되지 않았습니다.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '박성현 ♥ 조소민 결혼합니다',
        description: '저희의 결혼식에 초대합니다.',
        imageUrl: THUMBNAIL_URL,
        link: {
          mobileWebUrl: INVITATION_URL,
          webUrl: INVITATION_URL,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: INVITATION_URL,
            webUrl: INVITATION_URL,
          },
        },
      ],
    });
  };

  return (
    <Button onClick={shareKakao} variant='ghost' className='gap-2 text-lg'>
      <img src={KakaoIcon} alt='카카오톡 아이콘' width={18} className='grayscale' />
      <p className='text-sm'>카카오톡 공유하기</p>
    </Button>
  );
};

export default KakaoShareButton;
