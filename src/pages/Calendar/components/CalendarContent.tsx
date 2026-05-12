import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const days = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarContent = () => {
  const firstDay = new Date(2026, 6, 1).getDay(); // 2026년 7월 1일
  const lastDate = new Date(2026, 7, 0).getDate(); // 2026년 7월 마지막 날짜

  const dates = Array(firstDay)
    .fill(null)
    .concat([...Array(lastDate)].map((_, i) => i + 1));

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
                          ? 'bg-[#858585] text-white rounded-full'
                          : isSunday
                            ? 'text-[#c6472b]'
                            : isSaturday
                              ? 'text-blue-500'
                              : ''
                      }
                    >
                      {date || ''}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CalendarContent;
