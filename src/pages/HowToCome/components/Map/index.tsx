import { useEffect } from 'react';

import MapButton from '@/pages/HowToCome/components/Map/MapButton';

import naverMapImage from '@/assets/images/naver_map.webp';
import kakaoMapImage from '@/assets/images/kakaomap_basic.png';
import tMapImage from '@/assets/images/t_map.svg';

const WEDDING_HALL_NAME = '아펠가모 선릉';
const WEDDING_HALL_ADDRESS = '서울 강남구 테헤란로 322 한신인터밸리24 4층';

const LATITUDE = 37.5029773;
const LONGITUDE = 127.046553;

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const mapContainer = document.getElementById('map') as HTMLElement | null;

      if (!mapContainer) {
        console.error('지도 컨테이너를 찾을 수 없습니다.');
        return;
      }

      if (!window.naver?.maps) {
        console.error('네이버 지도 SDK가 로드되지 않았습니다.');
        return;
      }

      const position = new window.naver.maps.LatLng(LATITUDE, LONGITUDE);

      const map = new window.naver.maps.Map(mapContainer, {
        center: position,
        zoom: 16,
      });

      new window.naver.maps.Marker({
        position,
        map,
      });
    };

    initMap();
  }, []);

  const mapStyle = {
    width: '100%',
    height: '300px',
  };

  const openWithNaverMap = () => {
    window.location.href = `https://map.naver.com/p/search/${encodeURIComponent(WEDDING_HALL_NAME)}`;
  };

  const openWithKakaoMap = () => {
    window.location.href = `https://map.kakao.com/link/search/${encodeURIComponent(WEDDING_HALL_ADDRESS)}`;
  };

  const openWithTMap = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      alert('티맵은 모바일 기기에서만 이용 가능합니다.');
      return;
    }

    const tmapUrl = `tmap://route?rGoName=${encodeURIComponent(WEDDING_HALL_NAME)}&rGoX=${LONGITUDE}&rGoY=${LATITUDE}`;

    const fallbackUrl = isAndroid
      ? 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku'
      : isIOS
        ? 'https://apps.apple.com/kr/app/t-map-%ED%8B%B0%EB%A7%B5/id431589174'
        : '';

    let isAppOpened = false;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isAppOpened = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.location.href = tmapUrl;

    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (!isAppOpened && fallbackUrl) {
        window.location.href = fallbackUrl;
      }
    }, 1500);
  };

  return (
    <div className='mb-4'>
      <div id='map' style={mapStyle}></div>

      <div className='flex px-2 py-1 bg-gray-50'>
        <MapButton onClick={openWithNaverMap} icon={naverMapImage}>
          네이버 지도
        </MapButton>

        <MapButton onClick={openWithKakaoMap} icon={kakaoMapImage}>
          카카오 맵
        </MapButton>

        <MapButton onClick={openWithTMap} icon={tMapImage}>
          티맵
        </MapButton>
      </div>
    </div>
  );
};

export default Map;
