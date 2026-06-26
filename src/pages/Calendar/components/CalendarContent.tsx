import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CalendarPlus, Heart } from 'lucide-react';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const weddingTitle = '성현 소민 결혼식';
const weddingLocation = '아펠가모 선릉 4층 단독홀';
const weddingStart = '20260725T170000';
const weddingEnd = '20260725T190000';

const escapeCalendarText = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

const createCalendarFile = () => {
  const calendarLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//SH//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-sh-20260725T170000@wedding-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;TZID=Asia/Seoul:${weddingStart}`,
    `DTEND;TZID=Asia/Seoul:${weddingEnd}`,
    `SUMMARY:${escapeCalendarText(weddingTitle)}`,
    `LOCATION:${escapeCalendarText(weddingLocation)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return new Blob([calendarLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
};

const CalendarContent = () => {
  const firstDay = new Date(2026, 6, 1).getDay(); // 2026년 7월 1일
  const lastDate = new Date(2026, 7, 0).getDate(); // 2026년 7월 마지막 날짜

  const dates = Array(firstDay)
    .fill(null)
    .concat([...Array(lastDate)].map((_, i) => i + 1));

  const handleAddCalendar = () => {
    const calendarFile = createCalendarFile();
    const calendarUrl = URL.createObjectURL(calendarFile);
    const link = document.createElement('a');

    link.href = calendarUrl;
    link.download = 'wedding-sh-2026-07-25.ics';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(calendarUrl), 1000);
  };

  return (
    <div className='w-full h-full leading-9'>
      <div className='text-2xl font-medium tracking-wide'>2026.07.25</div>
      <div className='mb-5 tracking-wider'>토요일 오후 5시</div>

      <div className='w-full px-4 pb-10 text-center'>
        <Table>
          <TableHeader>
            <TableRow>
              {days.map((day, index) => (
                <TableHead
                  key={index}
                  className={
                    day === '일'
                      ? 'text-[#c6472b] text-center'
                      : day === '토'
                        ? 'text-blue-500 text-center'
                        : 'text-center'
                  }
                >
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: Math.ceil(dates.length / 7) }, (_, week) => (
              <TableRow key={week}>
                {dates.slice(week * 7, (week + 1) * 7).map((date, i) => {
                  const isSunday = i === 0;
                  const isSaturday = i === 6;
                  const isWeddingDay = date === 25;

                  return (
                    <TableCell
                      key={i}
                      className={
                        isWeddingDay
                          ? 'text-white'
                          : isSunday
                            ? 'text-[#c6472b]'
                            : isSaturday
                              ? 'text-blue-500'
                              : ''
                      }
                    >
                      {isWeddingDay ? (
                        <span className="relative inline-flex h-9 w-9 items-center justify-center">
                          <Heart
                            className="absolute inset-0 h-full w-full fill-[#858585] text-[#858585]"
                            aria-hidden="true"
                          />
                          <span className="relative z-10">{date}</span>
                        </span>
                      ) : (
                        date || ''
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          type="button"
          variant="outline"
          size="custom"
          className="mt-8 gap-2 border-[#d8d1cc] bg-white text-[#2b2222] shadow-sm hover:bg-[#f8f4f1]"
          onClick={handleAddCalendar}
        >
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          캘린더 등록하기
        </Button>
      </div>
    </div>
  );
};

export default CalendarContent;
