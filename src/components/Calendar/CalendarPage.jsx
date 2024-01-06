import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Alert, Badge, Calendar, Col, Modal, Row, Timeline } from 'antd';
const calenderListInADay = [
  {
    id: 1,
    email: 'abc@gmail.com',
    phone: '092132132131',
    date: '22/09/2024',
    time: '10:12',
    type: 'ảnh cưới',
    address: '20 hà văn tính, hòa khánh nam, liên chiểu',
  },
  {
    id: 2,
    email: 'abcdd@gmail.com',
    phone: '092132132131',
    date: '22/09/2024',
    time: '14:12',
    type: 'ảnh cưới',
    address: '20 avsd, hòa khánh nam, liên chiểu',
  },
  {
    id: 3,
    email: 'abcdd@gmail.com',
    phone: '092132132131',
    date: '22/09/2024',
    time: '16:12',
    type: 'ảnh cưới',
    address: '20 ádasdss, hòa khánh nam, liên chiểu',
  },
]
const CalendarList =
  [
    {
      "date": "2024-01-01",
      "events": [
        { "time": "10:30 - 2024-01-01", 'type': 'warning', "content": "This is warning event." },
        { "time": "12:30 - 2024-01-01", 'type': 'warning', "content": "This is usual event." }
      ]
    },
    {
      "date": "2024-01-02",
      "events": [
        { "time": "12:30 - 2024-01-02", 'type': 'warning', "content": "This is warning event." },
        { "time": "14:30 - 2024-01-02", 'type': 'error', "content": "This is usual event." },
        { "time": "16:30 - 2024-01-02", 'type': 'success', "content": "This is error event." }
      ]
    },
    {
      "date": "2024-01-03",
      "events": [
        { "time": "10:30 - 2024-01-03", 'type': 'warning', "content": "This is warning event" },
      ]
    }
  ]
const getListData = (value, calendar) => {
  const selectedDate = value.format('YYYY-MM-DD');
  const selectedDateEntry = calendar?.find(entry => entry.date === selectedDate);
  const newList = selectedDateEntry
    ? selectedDateEntry.events.map(event => ({
      type: event.type, // Replace 'type' with the actual property name in your event
      content: event.content,
    }))
    : []
  return newList;

};

export default function CalendarContainer() {
  const [calendarForMonth, setCalendarForMonth] = useState();
  const [calendarForDate, setCalendarForDate] = useState();
  const [eventCaledarForDate, setEventCalendarForDate] = useState();
  const [eventSelect, setEventSelect] = useState();
  const [value, setValue] = useState(() => dayjs('2024-01-01'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-01-01'));
  const [open, setOpen] = useState();

  useEffect(() => {
    // gọi api lịch cho tháng dựa trên selectedValue?.$M 
    //  fetchCalendarMonth(selectedValue?.$M)
    const resp = CalendarList;
    setCalendarForMonth(resp ?? []);
  }, [selectedValue])

  useEffect(() => {
    // gọi api lịch cho 1 ngày dựa trên value?.$M
    //  fetchCalendarMonth(selectedValue?.$M)
    const resp = calenderListInADay;
    setCalendarForDate(resp ?? []);
    setEventCalendarForDate(resp[0])
  }, [value])

  useEffect(() => {
    const newListEvent = calendarForDate?.map((item) => ({
      children: (
        <div key={item?.time} class="cursor-pointer bg-slate-100" onClick={() => handleChangeEvent(item)}>
          {`${item?.time} - ${item?.type}`}
        </div>
      )
    }));
    setEventCalendarForDate(newListEvent)
  }, [calendarForDate])

  function handleChangeEvent(value) {
    setEventSelect(value)
  }

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    setOpen(true);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, calendarForMonth);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div class='' style={{ padding: '5% 10% 5% 10%' }}>
      <h1 class='py-20 text-6xl  text-black' >Lịch làm việc</h1>
      <div class="w-8 h-1 mt-5 bg-transparent border-b-2 border-btnprimary"></div>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar mode="month" cellRender={cellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />;

      <Modal
        title={`${value?.format('YYYY-MM-DD')} `}
        centered
        open={open}
        width={1000}
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        <Row class='w-full flex gap-5' style={{ marginTop: 40 }}>
          <Col span={7}>
            <h1 class='text-xl font-bold '> Lịch trình trong ngày </h1>
            <div class='my-5'>
              <Timeline
                items={eventCaledarForDate ?? []}
              />
            </div>

          </Col>
          <Col span={16}>
            <h1 class='text-xl font-bold'>  Nội dung cụ thể</h1>
            <div class='p-2 flex flex-row justify-between'>
              <div class='flex'>
                <h2 class='font-bold'>{`Mã booking: ${eventSelect?.id}`}</h2>
              </div>
              <div class='flex'>
                <h2 class='font-bold'>{`Date booking: ${eventSelect?.date}`}</h2>
              </div>
            </div>

            <div class='p-2 flex flex-row justify-between'>
              <div class='flex'>
                <h2 class='font-bold'>{`Thời gian: ${eventSelect?.time}`}</h2>
              </div>
              <div class='flex'>
                <h2 class='font-bold'>{`Thể loại: ${eventSelect?.type}`}</h2>
              </div>
            </div>

            <div class='p-2 flex flex-row justify-between'>
              <div class='flex'>
                <h2 class='font-bold'>{`Số điện thoại: ${eventSelect?.phone}`}</h2>
              </div>
              <div class='flex'>
                <h2 class='font-bold'>{`Email: ${eventSelect?.email}`}</h2>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div >
  );
}