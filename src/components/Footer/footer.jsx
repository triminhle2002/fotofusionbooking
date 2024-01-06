import React from "react";
import logoFushion from "../../public/img/logoFushion.jpg";
import {
  AiFillPhone,
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlineDown,
  AiOutlineMail,
} from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { BsInstagram, BsTwitter, BsFillPenFill } from "react-icons/bs";

const footer = () => {
  const iframeStyle = {
    border: "none",
    overflow: "hidden",
  };
  return (
    <div>
      <footer className="bg-black ">
        <div className=" text-white flex justify-center items-center font-sans text-base m-2">
          <ul className="flex justify-center items-center mt-2">
            <li className="mr-4">
              <a className="flex items-center justify-center">
                <BsInstagram />
                <span className="ml-2 text-xs">Instagram</span>
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://www.facebook.com/studiofotofusion"
                className="flex items-center justify-center"
              >
                <AiOutlineFacebook />
                <span className="ml-2 text-xs">Facebook</span>
              </a>
            </li>
            <li className="mr-4">
              <a className="flex items-center justify-center">
                <BiLogoTiktok />
                <span className="ml-2 text-xs">Tiktok</span>
              </a>
            </li>
            <li className="mr-4">
              <a className="flex items-center justify-center">
                <BsTwitter />
                <span className="ml-2 text-xs">Twitter</span>
              </a>
            </li>
            <li className="mr-4">
              <a className="flex items-center justify-center">
                <AiOutlineYoutube />
                <span className="ml-2 text-xs">Youtube</span>
              </a>
            </li>
          </ul>
        </div>
        <div className=" mx-auto max-w-screen-xl p-4 py-6 lg:py-8 border-b w-[90%] shadow-sm flex items-center justify-center">
          <div className="md:flex md:justify-between items-center w-[35%]">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img
                  src={logoFushion}
                  className="h-8 mr-3"
                  alt=" Fushion Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white max-sm:text-sm">
                  FutoFusion
                </span>
              </a>
            </div>
          </div>
          <div className="md:flex md:justify-between text-btnprimary w-[18%]">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[#4C4D52] text-3xl">
                  <AiFillPhone />
                </div>
                <div className="ml-2 max-sm:hidden">
                  <span>Số Điện Thoại</span>
                  <br />
                  <span>+84 12345697698</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-between text-btnprimary w-[20%] ">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[#4C4D52] text-3xl">
                  <AiOutlineMail />
                </div>
                <div className="ml-2 max-sm:hidden">
                  <span>Email</span>
                  <br />
                  <span>fotofushion@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-between text-btnprimary w-[27%]">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[#4C4D52] text-3xl">
                  <CiLocationOn />
                </div>
                <div className="ml-2 max-sm:hidden">
                  <span>Địa Chỉ</span>
                  <br />
                  <span>245-Nguyễn Văn Linh Hải Châu Đà Nắng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center ">
          <div className="w-[90%] flex text-white justify-center items-center">
            <div className="w-1/2 justify-items-center align-items-center m-10 ml-30 ">
              <span className="width-[50%] text-end pr-4">
                The world without photography will be meaningless to us if there
                is no light and color, which opens up our minds and expresses
                passion.
              </span>
              <br />
              <span className="text-2xl font-dancing flex justify-center items-center mt-10">
                {" "}
                Ảnh mới nhất
              </span>
              <div className="flex items-center justify-center mt-5">
                <div className="h-24 w-24 bg-red-500 m-3">
                  <img
                    className=" h-24 w-24 object-cover"
                    src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/414957539_1834199973685717_2905869864158285567_n.jpg?stp=dst-jpg_p600x600&_nc_cat=106&ccb=1-7&_nc_sid=c42490&_nc_ohc=QjZrfuWpWWAAX9YHhAf&_nc_ht=scontent.fdad1-2.fna&oh=00_AfAB4_UNV2nk03l_44pBlnqss_UVl3QWAGMol63SywBCtw&oe=659BA13E"
                    alt=""
                  />
                </div>
                <div className="h-24 w-24 bg-red-500 m-2">
                  <img
                    className=" h-24 w-24 object-cover"
                    src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/415953125_3605816353072274_1701216851228906781_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=c42490&_nc_ohc=vVnnsXi-DQIAX9jd43m&_nc_ht=scontent.fdad1-3.fna&oh=00_AfAL0_Ph-AfnigrFNlXD2DrvHMnVUKDcJS6ATWALmNg0Tg&oe=659A99C8"
                    alt=""
                  />
                </div>
                <div className="h-24 w-24 bg-red-500 m-2">
                  <img
                    className=" h-24 w-24 object-cover"
                    src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/416272837_1081268282888601_7283139712059636554_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c42490&_nc_ohc=7AA124Jw1aUAX_KRszm&_nc_ht=scontent.fdad2-1.fna&oh=00_AfBGsKz_1rAizs60mRiaLjV4GLIfM2vzkBFzGfFI2jDCCA&oe=659B05C0"
                    alt=""
                  />
                </div>
                <div className="h-24 w-24 bg-red-500 m-2">
                  <img
                    className=" h-24 w-24 object-cover"
                    src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/412990506_3742428312659285_6595265878142349009_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c42490&_nc_ohc=uZio7zmf_DoAX-68LeR&_nc_ht=scontent.fdad2-1.fna&oh=00_AfDz8CLGS0WB5PM8BRcINsjMBRWCW5mo75f3DLuB8GnAQQ&oe=659C4B2F"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 justify-items-center align-items-center m-10">
              <span className="flex items-center justify-center text-3xl">
                {" "}
                Fanpage Facebook
              </span>
              <br />
              <div className="flex justify-center items-center">
                <div className="w-[600px] h-[270px] flex justify-center">
                  <iframe
                    title="Facebook Page"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fstudiofotofusion&tabs=timeline&width=600&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="600"
                    height="200"
                    style={iframeStyle}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;
