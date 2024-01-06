import React, { useEffect, useState } from "react";
import CardPromotion from "./CardPromotion";
import * as eventApi from '../../apis/promotionEvent'

const PromotionPage = () => {
  const [promotionList, setPromotionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProEvent = await eventApi.getPromotionEvent();
        setPromotionList(dataProEvent);
      } catch (error) {
        console.error('Error fetching blogposts:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <img src="https://firebasestorage.googleapis.com/v0/b/fotofushion-51865.appspot.com/o/FrojectImage%2FbnEvent.png?alt=media&token=b83e93f2-0ead-45bc-be04-5f229d93825e" alt="" />
      <div class='w-full flex justify-center'>
        <div class='py-4 flex flex-col w-3/4 justify-center'>
          {/* blogList */}

          <div class="w-full mt-10 flex flex-col gap-10">
            {promotionList?.map((item) => (
              <CardPromotion
                id={item?.id}
                title={item?.name}
                startdate={item?.start_day}
                enddate={item?.end_day}
                description={item?.description}
                type={item?.type}
                status={item?.status}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default PromotionPage;